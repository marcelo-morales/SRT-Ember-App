import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LoginService extends Service {
  @tracked isVisible = false;
  @tracked isAuthenticated = false;

  @action toggleVisible() {
    this.isVisible = !this.isVisible;
  }

  @action toggleAuthenticated(){
      this.isAuthenticated = !this.isAuthenticated;
  }
}