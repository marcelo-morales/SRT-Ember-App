import Component from '@glimmer/component';
import ENV from 'cosmology-class/config/environment';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class LivefeedComponent extends Component {

    @service('live-stream') liveStream;
    @tracked isLarge = false;

    @action toggleLarge() {
        this.isLarge = !this.isLarge;
    }

    @action toggleShown(event) {
        this.liveStream.toggleShow();
    }

    get ls() {
        return getOwner(this).lookup('service:live-stream');
    }
    get IPaddress() {
        return '10.162.60.78:80';
    }
    get username() {
        return encodeURIComponent(ENV.SRT_username);
    }
    get password() {
        return encodeURIComponent(ENV.SRT_password);
    }
    get static() {
        return 'ISAPI/Streaming/channels/102/httpPreview';
    }
}
