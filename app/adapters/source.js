import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class sourceAdapter extends JSONAPIAdapter {
    host = "http://localhost:6060/api";
    
    pathForType(type) {
        return "sources";
    }
}