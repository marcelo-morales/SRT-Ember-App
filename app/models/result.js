import Model, { attr } from '@ember-data/model';

export default class ResultModel extends Model {
  @attr('string') DBid;
  @attr('string') command;
  @attr('string') plot;
  @attr('string') data;
}
