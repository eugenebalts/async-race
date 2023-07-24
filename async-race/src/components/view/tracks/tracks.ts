import './tracks.css';
import createNewElement from "../create-new-element";
import Controller from "../../controller/controller";
import Car from "../car/car";
import Track from "../track/track";
import { ICar } from '../../types/cat.types';
import STATE from '../../model/STATE';

export default class Tracks {
    controller = new Controller();
    garageSection: HTMLElement | null = document.querySelector('.section_garage');

    async drawTracksWrapper() {
        const tracksWrapper = createNewElement('ul', ['garage__tracks']);

        const gotCars: ICar[] = await this.controller.getCars(STATE.currentPage);   

        if (gotCars) {
            for (const car of gotCars) {
                console.log(car);
                const carInstance = new Car(car['name'], car['color'], car['id']);
                const newCar = carInstance.createCar();
                const trackInstance = new Track(newCar);
                const newTrack = trackInstance.drawTrack(carInstance.name, carInstance.id);
                tracksWrapper?.append(newTrack);
            }
        }

        return tracksWrapper;
    }
}