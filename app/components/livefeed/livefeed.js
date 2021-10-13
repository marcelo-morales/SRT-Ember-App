import Component from '@glimmer/component';
import ENV from 'cosmology-class/config/environment';

export default class LivefeedComponent extends Component {
    get IPaddress() { 
        return "10.162.60.78"
    }
    get username () {
        return ENV.SRT_username;
    }
    get password() {
        return ENV.SRT_password;
    }

    get static() {
        return "ISAPI/Streaming/channels/102/httpPreview";
    }
    
}
