import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { readCookie } from '../helpers/cookies';

export default class AuthenticateAdapter extends JSONAPIAdapter {
    host = "http://localhost:6060";

    pathForType = function(type) {
        var camelized = Ember.String.camelize(type);
        return camelized;
    }

    get headers() {
        let bearer = `Bearer ${readCookie("token")}`;
        return {
            'Authorization': bearer,
        }
    }
}