import View from '../view/view';
import Controller from '../controller/controller';

export default class Application {
	controller = new Controller();
	view = new View();

	async start() {
		// alert('Привет! Я самую малость не доделал работу, мне осталось отрисовать пару элелментов и немножко доделать логику. Честно, пытался доделать сегодня, пытался доделать таск до 5 утра, но сил уже не хватает. Друг, если есть возможность не проверять до вечера, дай мне поалуйста воспользоваться этим шансом! Буду очень благодарен!');
		await this.controller.getAllCars();
		await this.controller.getWinners();
		this.view.render();
	}
}