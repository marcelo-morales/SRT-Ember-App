import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { readCookie } from '../helpers/cookies';

export default class userAdapter extends JSONAPIAdapter {
    host = "http://localhost:6060/api"; 

    get headers() {
        let bearer = `Bearer ${readCookie("token")}`;
        return {
            'Authorization': bearer,
        }
    }

}