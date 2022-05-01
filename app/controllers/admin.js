import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AdminController extends Controller {
    @action async delete(event){
        let row = event.originalTarget.parentElement.rowIndex
        let table = document.getElementsByClassName("users")[0];
        const id = table.rows[row].id;
        let post = this.store.peekRecord('user', id)
        try {
            post.destroyRecord();
        } catch(err) {
            console.log(err)
        }
    }

    @action async createUser() {
        try {
            let query = this.store.createRecord('user', {
                role: "USER" 
            });
            await query.save();
        } catch(err) {
            console.log(err);
        }
    }

    @action async createAdmin() {
        try {
            let query = this.store.createRecord('user', {
                role: "ADMIN",
            });
            await query.save();
        } catch(err) {
            console.log(err);
        }
    }
}