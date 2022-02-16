import Model, { attr } from '@ember-data/model';

export default class QueryModel extends Model {
  @attr('string') command;
  @attr('string') email;
}
