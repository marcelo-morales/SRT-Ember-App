import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ToastService extends Service {
	@tracked message;
	@tracked error;//type of error 
	@tracked isVisible = false;

	@action toggleVisible(error, message) {
		this.message = message;
		this.error = error;
		this.isVisible = !this.isVisible;
		setTimeout(() => {
			this.isVisible = false;
		}, 4900)
	}
}