import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class SrtController extends Controller {
    //@tracked record;
    @tracked is25Scan;
    @tracked az;
    @tracked el;
    @tracked glat;
    @tracked glon;
    @tracked azoff;
    @tracked eloff;
    @tracked freq;

    @action toggle25Point() {
        this.is25Scan = true;
    }

    @action toggleBeamswitch(){
        this.is25Scan = false;
    }

    @action submitCommands() {
        
    }

    @action validateGalactic() {
        
    }
};