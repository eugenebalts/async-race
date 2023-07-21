import View from '../view/view';

export default class Application {
	view = new View();

	start() {
		this.view.render();
		
	}
}