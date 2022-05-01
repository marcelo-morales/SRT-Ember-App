import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class ApplicationRoute extends Route {
  beforeModel() {
    return RSVP.hash({
      sources: this.store.findAll('source'),
    });
  }
}
