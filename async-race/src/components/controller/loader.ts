// import { Options } from "../types/types";
import Garage from "../view/garage/garage";

export default class Loader {
    garage = new Garage();
    readonly baseLink: string = 'http://127.0.0.1:3000';
    readonly path = {
        garage: '/garage',
        winners: '/winners'
    };

    public async getGarage() {
        fetch(`${this.baseLink}${this.path.garage}`)
            .then((res) => res.json())
            .then((data) => this.garage.drawCars(data));
    }

    public async getWinners() {
        fetch(`${this.baseLink}${this.path.winners}`)
            .then((res) => res.json())
            .then(data => this.garage.drawCars(data));
    }

}
