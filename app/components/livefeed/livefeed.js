import Component from '@glimmer/component';
import ENV from 'cosmology-class/config/environment';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LivefeedComponent extends Component {

    @tracked isShown = false;
    @tracked isLarge = false;

    @action toggleShow() {
        this.isShown = !this.isShown;
    }
   @action toggleLarge() {
        this.isLarge = !this.isLarge;
    }

  get IPaddress() {
    return '10.162.60.78';
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
