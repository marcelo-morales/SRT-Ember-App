import Model, { attr, belongsTo } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') username;
  @attr('string') password;
  @attr('string') role;
  @attr('number') attempts;
}

