import  Controller  from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Ember from 'ember';
import { tracked } from '@glimmer/tracking';

//For new pdf files added, add name to 
export default class ClassController extends Controller {
	@tracked files = [
		"Big-Bang-4",
		"Black-Hole-4",
		"Condensed-Matter-2",
		"Graphene-2",
		"Higgs-Boson-2",
		"Laser-PRINT-2",
		"Nanotechnology-2",
		"Ordinary-Objects-2",
		"Radioactivity-2",
		"Superfluids-1"
	]

	//Opens the selected pdf in another tab
    @action
    openPdf(event) {
		let file = event.originalTarget.id;
		window.open(`./assets/files/brochures/${file}.pdf`)
    }
}