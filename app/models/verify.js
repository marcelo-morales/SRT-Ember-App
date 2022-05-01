import Model, { attr } from '@ember-data/model';

export default class VerifyModel extends Model {
  @attr('string') token;
  @attr('string') role;
}