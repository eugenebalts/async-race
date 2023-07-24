import View from '../view/view';
import Controller from '../controller/controller';

export default class Application {
	controller = new Controller();
	view = new View();

	async start() {
		await this.controller.getAllCars();
		this.view.render();
	}
}