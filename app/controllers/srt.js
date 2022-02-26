import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import ENV from 'cosmology-class/config/environment';
import { action } from '@ember/object';
import { format } from 'prettier';

export default class SrtController extends Controller {
  idCount = 1;
  //@tracked file;
  @tracked prevCommand = ['', ''];
  @tracked command = ": record";

  @tracked sourceName = undefined;
  @tracked is25Scan = true;
  @tracked freq = undefined;
  @tracked recordTime;

  @tracked az;
  @tracked el;
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

  @action addAzEl() {
    if (this.el === undefined || this.az === undefined) {
      return;
    }
    this.prevCommand = this.command;
    let azelCommand = `\n: azel ${this.az} ${this.el}`;
    this.command = this.command.concat(azelCommand);
  }

  @action addFrequency(){
    if (this.freq === undefined) {
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
    if (this.recordTime === undefined) {
      return;
    }
    this.prevCommand = this.command;
    let timeCommand = `\n:${this.recordTime}`;
    this.command = this.command.concat(timeCommand);      
  }

  @action selectSource(source) {
    this.sourceName = source;
  }

  //TODO: Check if command is duplicate
    @action async submitCommand() {
        if (this.email === undefined || this.command === undefined) {
            return;
            //Need to display error
        }
        try {
                if (!this.command.includes("record")){
                    throw new Error("Command needs to be recorded");
                }  
                if (this.command.indexOf("record") === this.command.length - 6) {
                    throw new Error("Recorded command cannot be empty");
                }
                this.command = this.command.concat('\n: roff\n: stow\n: vplot');
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
            console.error(error);
        }
    }
}
