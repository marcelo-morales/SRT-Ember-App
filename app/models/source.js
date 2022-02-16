import Model, { attr, belongsTo } from '@ember-data/model';

export default class SourceModel extends Model {
  @belongsTo('sourcelist') sourcelist;
  @attr('string') source;
}
