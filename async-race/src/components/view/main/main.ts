import './main.css';
import Navigation from "../navigation/navigation";
import Garage from "../garage/garage";
import Winners from '../winners/winners';
import createNewElement from "../create-new-element";

export default class Main {
    body: HTMLBodyElement | null = document.querySelector('body');
    container: HTMLDivElement | null = document.querySelector('.container');
    navigation = new Navigation();
    garage = new Garage();
    winners = new Winners();

    // createMain() {
    //     this.container = document.querySelector('.container');
    //     const main = createNewElement<HTMLElement>('main', ['main']);
    //     this.container?.append(main);
    // }

    async drawMain() {
        const main = createNewElement<HTMLElement>('main', ['main']);

        const navigation = this.navigation.drawNavigation();
        const garage = await this.garage.drawGarage();

        main.append(navigation);
        main.append(garage);
        return main;
    }

    // drawMain() {
    //     this.createMain();
    //     this.navigation.drawNavigation();
    //     this.garage.drawGarage();
    //     this.winners.drawWinners();
    // }
}