// import Car from "../car/car";
import './track.css';
import createNewElement from "../create-new-element";

import Car from '../car/car';
import Controller from '../../controller/controller';

export default class Track {
    car: Car;
    controller = new Controller();

    constructor(car: Car) {
        this.car = car;
    }

    drawTrack(title: string, id: number) {
        const track = createNewElement('li', ['garage__track']);

        const trackHeader = this.drawHeader(title, id);
        const trackRoad = this.drawRoad();

        track.append(trackHeader);
        track.append(trackRoad);
        return track;
    }

    drawHeader (title: string, id: number) {
        const trackHeader = createNewElement('div', ['track__header']);
        const headerButtons = createNewElement('div', ['track__buttons']);
        const updateButton = createNewElement('button', ['track__button', 'track__button_update']);
        const deleteButton = createNewElement('button', ['track__button', 'track__button_delete']);
        updateButton.setAttribute('data-id', String(id));
        deleteButton.setAttribute('data-id', String(id));
        headerButtons.append(updateButton);
        headerButtons.append(deleteButton);

        const trackTitle = createNewElement('h3', ['track__title'], {innerHTML: `${title} <span>#${id}</span>`});
        
        trackHeader.append(headerButtons);
        trackHeader.append(trackTitle);

        return trackHeader;
    }

    drawRoad() {
        const trackRoad = createNewElement('div', ['track__road']);
        const roadButtons = createNewElement('div', ['road__buttons']);
        const driveButton: HTMLButtonElement = createNewElement('button', ['road__button', 'road__button_drive'], {textContent: 'D'});
        const stopButton: HTMLButtonElement = createNewElement('button', ['road__button', 'road__button_stop'], {textContent: 'R', disabled: 'true'});
        const finish = createNewElement('div', ['road__finish']);
        const newCar = this.car.createCar();

        roadButtons.addEventListener('click', async (event) => {
            const startPosition = newCar.getBoundingClientRect().left;
            if (event.target instanceof HTMLElement) {
                if (event.target.classList.contains('road__button_drive')) {
                    const {velocity, distance} = await this.controller.startEngine(this.car.id);
                    console.log(velocity, distance);
                    const startPosition = newCar.getBoundingClientRect().left;
                    const endPosition = finish.getBoundingClientRect().right;
                    const difference = endPosition - startPosition;
                    console.log(startPosition);
                    console.log(endPosition);

                    const animateCar = async (distance: number, velocity: number) => {
                        driveButton.disabled = true;
                        stopButton.disabled = false;
                        newCar.classList.add('animate');
                        const time = distance / velocity;
                        newCar.style.setProperty('--animation-duration', time / 1000 + 's');
                        newCar.style.transform = `translateX(${difference}px)`;
                        try {
                            const data = await this.controller.driveMode(this.car.id);
                            newCar.classList.add('finished');
                            return data;
                        } catch {
                            // const currentPosition = newCar.getBoundingClientRect().left;
                            newCar.style.transform = `translateX(${newCar.getBoundingClientRect().left - newCar.clientWidth}px)`;
                            newCar.classList.remove('animate');
                            newCar.classList.add('broken'); 
                        }
                    };

                    animateCar(distance, velocity);

                }

                if (event.target.classList.contains('road__button_stop')) {
                    driveButton.disabled = false;
                    if (newCar.classList.contains('finished')) newCar.classList.remove('finished');
                    if (newCar.classList.contains('broken')) newCar.classList.remove('broken');
                }
                
            }
        });

        roadButtons.append(driveButton);
        roadButtons.append(stopButton);
        trackRoad.append(roadButtons);
        trackRoad.append(newCar);
        trackRoad.append(finish);

        return trackRoad;
    }
}