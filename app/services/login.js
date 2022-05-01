import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LoginService extends Service {
  @tracked isVisible = false;
  @tracked isAuthenticated = false;
  @tracked role = "";

  @action toggleVisible() {
    this.isVisible = !this.isVisible;
  }

  @action toggleAuthenticated(role){
      this.isAuthenticated = !this.isAuthenticated;
      this.role = role
  }

  @action logout() {
      this.isAuthenticated = false;
      this.role = "";
  }
}