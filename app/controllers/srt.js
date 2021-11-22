import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { format } from "prettier";

export default class SrtController extends Controller {
    //@tracked record;
    @tracked commands = ["", ""];
    @tracked advancedSettings = false;

    //Setup
    @tracked setup = true; //Check if setup is not filled
    @tracked sourceName = undefined;
    @tracked is25Scan = undefined;
    @tracked freq = undefined; 
    //Record after setup

    @tracked recordTime;
    @tracked az;
    @tracked el;
    @tracked glat;
    @tracked glon;
    @tracked azoff;
    @tracked eloff;


    @action toggleAdvanced() {
        this.advancedSettings = !this.advancedSettings;
    }

    @action toggle25Point() {
        this.is25Scan = true;
        this.validateSetup();
    }

    @action toggleBeamswitch(){
        this.is25Scan = false;
        this.validateSetup();
    }

    @action selectSource(source) {
        this.sourceName = source;
        this.validateSetup();
    }

    @action submitCommands() {
        this.commands[0] = this.commands[1];
        this.formatCommands();
    }

    formatCommands() {
        let command = `\n:${this.recordTime} ${this.sourceName}`
        this.commands[1] = this.commands.concat(command)
    }

    getMode() {
        if (this.is25Scan) {
            return "n";
        } else {
            return "b";
        }
    }

    @action validateSetup() {
        if (this.sourceName !== undefined && this.is25Scan !== undefined
            && this.freq !== undefined) {
            this.setup = !this.setup;
            this.commands[1] = `: ${this.sourceName}\n: mode ${this.getMode()}\n: freq ${this.freq}`;
        }
    }

    @action validateGalactic() {
        
    }
};