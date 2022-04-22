import Component from '@glimmer/component';
import { inject as service} from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { writeCookie } from '../../helpers/cookies';

export default class loginComponent extends Component{
    @service('login') authentication; 
    @service('store') store;
    @tracked username = "";
    @tracked password = "";

    @action toggleVisible(event) {
        this.authentication.toggleVisible();
    }

    @action toggleAuthenticated(event) {
        this.authentication.toggleAuthenticated();
    }

    @action async authenticate() {
        if (this.username === "") {
            const msg = "Username is empty";
            document.getElementById("authLabel").innerHTML = msg;
            document.getElementById("username").setCustomValidity(msg);
        } else if (this.password === "") {
            const msg = "Password is empty";
            document.getElementById("authLabel").innerHTML = msg;
            document.getElementById("password").setCustomValidity(msg);
        } else { 
            try {
                let b = await this.store.queryRecord('authenticate', {username: this.username, password: this.password});
                writeCookie("token", b.get("token"));
                this.toggleAuthenticated();
                this.toggleVisible();
            } catch (err) {
                const msg = err.errors[0].detail;
                document.getElementById("authLabel").innerHTML = msg;
                document.getElementById("password").setCustomValidity(msg);
                document.getElementById("username").setCustomValidity(msg);
            }
        }
        
    }
}