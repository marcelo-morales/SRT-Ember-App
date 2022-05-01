import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class AdminRoute extends Route {
  beforeModel() {
    return RSVP.hash({
      sources: this.store.findAll('user'),
    });
  }
  model() {
      return this.store.peekAll("user");
  }
}
