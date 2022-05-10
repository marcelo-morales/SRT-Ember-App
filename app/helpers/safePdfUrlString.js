import Ember from 'ember';

const safePdfUrlString = function(value) {
	const url = "./assets/files";
    return Ember.String.htmlSafe(`${url}/${value}`);
}

export default Ember.Helper.helper(safePdfUrlString);