import './main.css';
import Navigation from '../navigation/navigation';
import Garage from '../garage/garage';
import Winners from '../winners/winners';
import createNewElement from '../create-new-element';

export default class Main {
    private navigation = new Navigation();
    private garage = new Garage();
    private winners = new Winners();

    async drawMain() {
        const main: HTMLElement = createNewElement('main', ['main']);
        const navigation: HTMLDivElement = this.navigation.drawNavigation();
        const garage: HTMLElement = await this.garage.drawGarage();
        const winners = await this.winners.drawWinners();

        main.append(navigation);
        main.append(garage);
        main.append(winners);

        return main;
    }
}