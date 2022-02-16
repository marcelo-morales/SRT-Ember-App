import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import ENV from 'cosmology-class/config/environment';
import { action } from '@ember/object';
import { format } from 'prettier';

export default class SrtController extends Controller {
  idCount = 1;
  //@tracked file;
  @tracked prevCommand = ['', ''];
  @tracked command = '';
  @tracked advancedSettings = false;

  //Setup
  @tracked setup = true; //Check if setup is not filled
  @tracked sourceName = undefined;
  @tracked is25Scan = undefined;
  @tracked freq = undefined;
  //Record after setup
  @tracked recordTime;

  //advanced Settings
  @tracked az;
  @tracked el;
  @tracked glat;
  @tracked glon;
  @tracked azoff;
  @tracked eloff;

  @action toggleAdvanced() {
    this.advancedSettings = !this.advancedSettings;
    console.log(sources);
  }

  @action toggle25Point() {
    this.is25Scan = true;
    this.validateSetup();
  }

  @action toggleBeamswitch() {
    this.is25Scan = false;
    this.validateSetup();
  }

  //Setup methods
  @action selectSetupSource(source) {
    this.sourceName = source;
    this.validateSetup();
  }

  @action validateSetup() {
    if (
      this.sourceName !== undefined &&
      this.is25Scan !== undefined &&
      this.freq !== undefined
    ) {
      this.command = `: ${this.sourceName}\n: mode ${this.getMode()}\n: freq ${
        this.freq
      }\n: record name`;
    }
  }

  getMode() {
    if (this.is25Scan) {
      return 'n';
    } else {
      return 'b';
    }
  }

  //Basic settings
  @action validateTime() {
    if (this.recordTime !== undefined) {
      this.setup = false;
    }
  }

  @action selectSource(source) {
    this.sourceName = source;
  }

  @action submitBasicCommands() {
    this.prevCommand = this.command;
    let command = `\n:${this.recordTime} ${this.sourceName}`;
    this.command = this.command.concat(command);
    this.setup = true;
    this.recordTime = undefined;
  }

  @action submitAdvancedCommmands() {
    this.prevCommand = this.command;
    let offsetCommand = `\n: offset ${this.azoff} ${this.eloff}`;
    let galCommand = `\n: galactic ${this.glat} ${this.glon}`;
    let azelCommand = `\n: azel ${this.az} ${this.el}`;

    this.command = this.command.concat(azelCommand);
    this.command = this.command.concat(galCommand);
    this.command = this.command.concat(offsetCommand);

    this.resetAdvanced();
    this.setup = true;
    this.recordTime = undefined;
  }

  @action validateAZ() {
    if (isNaN(parseInt(this.az, 10))) {
      this.az = undefined;
    }
    if (this.az < 0) {
      this.az = 0;
    } else if (this.az > 355) {
      this.az = 355;
    }
    this.validateAdvanced();
  }

  @action validateEL() {
    if (isNaN(parseInt(this.el, 10))) {
      this.el = undefined;
    }
    if (this.el < 0) {
      this.el = 0;
    } else if (this.el > 89.0) {
      this.el = 89.0;
    }
    this.validateAdvanced();
  }

  @action validateAdvanced() {
    if (
      this.azoff === undefined ||
      this.eloff === undefined ||
      this.glat === undefined ||
      this.glon === undefined ||
      this.az === undefined ||
      this.el === undefined
    ) {
      console.log('flipped');
      this.setup = true;
    } else {
      console.log('not flip');
      this.setup = false;
      console.log(this.setup);
    }
  }

  //TODO: Check if command is duplicate
  @action async submitCommand() {
    this.command = this.command.concat('\n: stow\n: vplot');
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
  }

  resetAdvanced() {
    console.log('resetting');
    this.az = undefined;
    this.el = undefined;
    this.glat = undefined;
    this.glon = undefined;
    this.azoff = undefined;
    this.eloff = undefined;
  }
}
