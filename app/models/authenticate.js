import Model, { attr } from '@ember-data/model';

export default class AuthenticateModel extends Model {
  @attr('string') message;
  @attr('string') token;
}