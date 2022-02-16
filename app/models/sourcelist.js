import Model, { hasMany } from '@ember-data/model';

export default class SourceListModel extends Model {
  @hasMany('source') sources;
}
