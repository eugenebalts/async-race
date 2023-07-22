import './tracks.css';
import createNewElement from "../create-new-element";
import Controller from "../../controller/controller";
import Car from "../car/car";
import Track from "../track/track";
import { ICar } from '../../types/cat.types';

export default class Tracks {
    controller = new Controller();
    garageSection: HTMLElement | null = document.querySelector('.section_garage');

    async drawTracksWrapper() {
        this.garageSection = document.querySelector('.section_garage');

        const tracksWrapper = createNewElement('ul', ['garage__tracks']);

        const data: ICar[] = await this.controller.getCars();

        if (data) {
            for (const object of data) {
                console.log(object);
                const newCar = new Car(object['name'], object['color'], object['id']);
                const car = newCar.createCar();
                const newTrack = new Track(car);
                const track = newTrack.createTrack(newCar.name, newCar.id);
                tracksWrapper?.append(track);
            }
        }

        this.garageSection?.append(tracksWrapper);
    }
}