import './track.css';
import { createNewElement } from '../../../utils/utils';
import Car from '../car/car';

export default class Track {
    private car: Car;

    constructor(car: Car) {
        this.car = car;
    }

    drawTrack(title: string, id: number) {
        const track: HTMLLIElement = createNewElement('li', ['garage__track']);
        track.setAttribute('data-id', String(this.car.id));
        const trackHeader: HTMLDivElement = this.drawHeader(title, id);
        const trackRoad: HTMLDivElement = this.drawRoad();

        track.append(trackHeader);
        track.append(trackRoad);

        return track;
    }

    private drawHeader (title: string, id: number) {
        const trackHeader: HTMLDivElement = createNewElement('div', ['track__header']);
        const headerButtons: HTMLDivElement = createNewElement('div', ['track__buttons']);
        const updateButton: HTMLButtonElement = createNewElement('button', ['track__button', 'track__button_update']);
        const deleteButton: HTMLBRElement = createNewElement('button', ['track__button', 'track__button_delete']);
        updateButton.setAttribute('data-id', String(id));
        deleteButton.setAttribute('data-id', String(id));
        const trackTitle: HTMLHeadingElement = createNewElement('h3', ['track__title'], {innerHTML: `${title} <span>#${id}</span>`});
        
        headerButtons.append(updateButton);
        headerButtons.append(deleteButton);
        trackHeader.append(headerButtons);
        trackHeader.append(trackTitle);

        return trackHeader;
    }

    private drawRoad() {
        const trackRoad: HTMLDivElement = createNewElement('div', ['track__road']);
        const roadButtons: HTMLDivElement = createNewElement('div', ['road__buttons']);
        const driveButton: HTMLButtonElement = createNewElement('button', ['road__button', 'road__button_drive'], {textContent: 'D'});
        const stopButton: HTMLButtonElement = createNewElement('button', ['road__button', 'road__button_stop'], {textContent: 'R', disabled: 'true'});
        const finish: HTMLDivElement = createNewElement('div', ['road__finish']);
        const newCar: HTMLElement = this.car.createCar();
        
        roadButtons.append(driveButton);
        roadButtons.append(stopButton);
        trackRoad.append(roadButtons);
        trackRoad.append(newCar);
        trackRoad.append(finish);

        return trackRoad;
    }
}