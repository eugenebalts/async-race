// import Car from "../car/car";
import './track.css';
import createNewElement from "../create-new-element";

export default class Track {
    car;
    constructor(car: HTMLElement) {
        this.car = car;
    }

    createTrack(title: string, id: string | number) {
        const track = createNewElement('li', ['garage__track']);
        const trackHeader = createNewElement('div', ['track__header']);
        const headerButtons = createNewElement('div', ['track__buttons']);
        const updateButton = createNewElement('button', ['track__button', 'track__button_update']);
        const deleteButton = createNewElement('button', ['track__button', 'track__button_delete']);
        headerButtons.append(updateButton);
        headerButtons.append(deleteButton);

        const trackTitle = createNewElement('h3', ['track__title'], {innerHTML: `${title} <span>#${id}</span>`});
        
        trackHeader.append(headerButtons);
        trackHeader.append(trackTitle);

        const trackRoad = createNewElement('div', ['track__road']);
        const roadButtons = createNewElement('div', ['road__buttons']);
        const driveButton = createNewElement('button', ['road__button', 'road__button_drive'], {textContent: 'D'});
        const stopButton = createNewElement('button', ['road__button', 'road__button_stop'], {textContent: 'R', disabled: 'true'});
        const finish = createNewElement('div', ['road__finish']);

        roadButtons.append(driveButton);
        roadButtons.append(stopButton);
        trackRoad.append(roadButtons);
        trackRoad.append(this.car);
        trackRoad.append(finish);

        track.append(trackHeader);
        track.append(trackRoad);
        return track;
    }
}