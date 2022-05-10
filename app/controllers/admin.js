import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AdminController extends Controller {
	@service('toast') toast;
	//Deletes user from database
    @action async delete(event){
        let row = event.originalTarget.parentElement.rowIndex
        let table = document.getElementsByClassName("users")[0];
        const id = table.rows[row].id;
        let post = this.store.peekRecord('user', id)
        try {
            post.destroyRecord();
        } catch(err) {
			this.toast.toggleVisible("error", "User could not be deleted. Please try again later.");
        } 
			this.toast.toggleVisible("success", "User was successfully deleted");
    }

	//Creates normal user in database
    @action async createUser() {
        try {
            let query = this.store.createRecord('user', {
                role: "USER" 
            });
            await query.save();
        } catch(err) {
            this.toast.toggleVisible("error", "User was unable to be created. Try again later");
        } finally {
			this.toast.toggleVisible("success", "User was successfully created. Please copy the password as it will become unavailable");
		}
    }
	//Creates admin user in database
    @action async createAdmin() {
        try {
            let query = this.store.createRecord('user', {
                role: "ADMIN",
            });
            await query.save();
        } catch(err) {
			this.toast.toggleVisible("error", "Admin was unable to be created. Try again later");
        } finally {
			this.toast.toggleVisible("success", "Admin was successfully created. Please copy the password as it will become unavailable");
		}
    }
}