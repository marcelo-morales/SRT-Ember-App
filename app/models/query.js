import Model, { attr } from '@ember-data/model';

export default class QueryModel extends Model{
    @attr('string') DBid;
    @attr('string') command;
}