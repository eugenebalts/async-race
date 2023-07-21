import './main.css';
import Navigation from "../navigation/navigation";
import Garage from "../garage/garage";
import createNewElement from "../create-new-element";

export default class Main {
    body: HTMLBodyElement | null = document.querySelector('body');
    container: HTMLDivElement | null = document.querySelector('.container');
    navigation = new Navigation();
    garage = new Garage();

    createMain() {
        this.container = document.querySelector('.container');
        const main = createNewElement<HTMLElement>('main', ['main']);
        this.container?.append(main);
    }

    drawMain() {
        this.createMain();
        this.navigation.drawNavigation();
        this.garage.drawGarage();
    }
}