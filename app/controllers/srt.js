import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import InputError from '../helpers/InputError';
import { inject as service } from '@ember/service';
import { checkCookieExist, deleteCookie, writeCookie } from '../helpers/cookies';

export default class SrtController extends Controller {
  idCount = 1;
  totalTime = 0;
  RECORD_LIMIT = 1800;
  recording = false;
  @service('login') authentication;
  @tracked prevCommand = ['', ''];
  @tracked command = "";

  @tracked sourceName = undefined;
  @tracked is25Scan = true;
  @tracked freq = undefined;
  @tracked recordTime;

  @tracked az = 175;
  @tracked el = 50;
  @tracked glat;
  @tracked glon;
  @tracked azoff;
  @tracked eloff;

  @action toggle25Point() {
    this.is25Scan = true;
  }

  @action toggleBeamswitch() {
    this.is25Scan = false;
  }

  @action addRecord() {
      if (!this.recording) {
        this.command = this.command.concat("\n: record");
        recording = true;
      } else {
        
      }
  }
  @action addAzEl() {
    if (this.el === undefined || this.az === undefined) {
      return;
    }
    this.prevCommand = this.command;
    let azelCommand = `\n: azel ${this.az} ${this.el}`;
    this.command = this.command.concat(azelCommand);
  }

  @action addFrequency(){
    let element = document.getElementById('freq');
    if (this.freq === undefined || this.freq === "") {
      element.setCustomValidity('Frequency cannot be empty');
      setTimeout(() => {
        element.setCustomValidity('');
      }, 2000);
      return;
    }
    this.prevCommand = this.command;
    let freqCommand = `\n: freq ${this.freq}`;
    this.command = this.command.concat(freqCommand);
  }

  @action addGalactic(){
    if (this.glat === undefined || this.glon === undefined) {
      return;
    }
    this.prevCommand = this.command;
    let galCommand = `\n: galactic ${this.glat} ${this.glon}`;
    this.command = this.command.concat(galCommand);      
  }

  @action addMode(){
    this.prevCommand = this.command;
    let modeCommand = `\n: mode ${this.getMode()}`;
    this.command = this.command.concat(modeCommand);      
  }

  getMode() {
    if (this.is25Scan) {
      return 'n';
    } else {
      return 'b';
    }
  }

  @action addOffset() {
    if (this.azoff === undefined || this.eloff === undefined) {
      return;
    }
    this.prevCommand = this.command;
    let offsetCommand = `\n: offset ${this.azoff} ${this.eloff}`;
    this.command = this.command.concat(offsetCommand);
  }

  @action addSource(){
    if (this.sourceName === undefined) {
      return;
    }
    this.prevCommand = this.command;
    let sourceCommand = `\n: ${this.sourceName}`;
    this.command = this.command.concat(sourceCommand);      
  }

  @action addTime(){
    let time_temp = this.totalTime;
    let element = document.getElementById('record_time');
    if (this.recordTime === undefined || this.recordTime === "") {
      element.setCustomValidity("Time cannot be empty");
      setTimeout(() => {
        element.setCustomValidity('');
      }, 2000);
      return;
    }
    if ((time_temp += parseInt(this.recordTime)) >= this.RECORD_LIMIT) {
      element.setCustomValidity("You have exceeded the maximum session time");
      setTimeout(() => {
        element.setCustomValidity('');
      }, 3000);
      this.recordTime = "";
      return;
    }
    this.totalTime = time_temp;

    this.prevCommand = this.command;
    let timeCommand = `\n:${this.recordTime}`;
    this.command = this.command.concat(timeCommand);      
  }

  @action selectSource(source) {
    this.sourceName = source;
  }

  //TODO: Check if command is duplicate
    @action async submitCommand() { 
        try { 
            
            if (this.email === undefined) {
               throw new InputError("email", "Email required to submit command");
            } else if (this.command === undefined || this.command === "") {
               throw new InputError("commandsTextArea", "Command are required")
            }
            if (!this.command.includes("record")){
                throw new InputError("commandsTextArea", "Command needs to be recorded");
            }  
            if (this.command.indexOf("record") === this.command.length - 6) {
                throw new InputError("commandsTextArea", "Recorded command cannot be empty");
            } 
            if (!this.authentication.isAuthenticated) {
                await this.performAuthentication();
            }
             
            this.command = this.command.concat('\n: roff\n: stow\n: vplot');
            //Need to Authenticate submitting of code on server side
            let query = this.store.createRecord('query', {
                command: this.command,
                id: this.idCount,
                email: this.email
            });
            try {
                await query.save();
            } catch (error) {
                console.error(error);
            }
            this.idCount++;
            
        } catch (error) {
            if (error instanceof InputError) {
                document.getElementById(error.element_id).setCustomValidity(error.message);
            } else {
                console.error(error, typeof error);
            }
        }
    }

    async performAuthentication() {
        if (checkCookieExist("token")) {
            let b = this.store.createRecord('verify');
            b.save().then((s) => {
                    this.authentication.toggleAuthenticated(s.get("role"));
                }).catch((err) => {
                    deleteCookie("token");
                   this.authentication.toggleVisible(); 
                });
        } else {
            this.authentication.toggleVisible(); 
        }
    }
}
