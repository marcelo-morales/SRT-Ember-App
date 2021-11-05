import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LiveStreamService extends Service {
    @tracked isShown = false;

    @action toggleShow() {
        this.isShown = !this.isShown;
    }

}