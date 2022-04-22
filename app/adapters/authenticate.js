import JSONAPIAdapter from '@ember-data/adapter/json-api';
import DS from 'ember-data';

export default class AuthenticateAdapter extends JSONAPIAdapter {
    //host: `http::/localhost:${ENV.WORKERPORT}/api`
    host = "http://localhost:6060";

    pathForType = function(type) {
        var camelized = Ember.String.camelize(type);
        return camelized;
    }
    
    handleResponse(status, headers, payload) {
        if (status >= 300  && status < 500 && payload.message) {
            return new DS.InvalidError([
                {detail: payload.message}
            ]);
        }
        return payload; 
    }
}