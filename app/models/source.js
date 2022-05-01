import Model, { attr, belongsTo } from '@ember-data/model';

export default class SourceModel extends Model {
  @attr('string') source;
}
