import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
    host = "http://localhost:6060/api";
	//host = "https://srtcosmology.herokuapp.com/api"
}