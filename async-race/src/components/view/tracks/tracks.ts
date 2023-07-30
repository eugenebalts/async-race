import './tracks.css';
import { createNewElement } from '../../../utils/utils';
import Controller from '../../controller/controller';
import Car from '../car/car';
import Track from '../track/track';
import { ICar } from '../../types/types';
import STATE from '../../model/STATE';
import UpdateCar from '../update-car/update-car';
import Winners from '../winners/winners';

export default class Tracks {
    private controller = new Controller();
    private winners = new Winners();

    async drawTracksWrapper() {
        const tracksWrapper: HTMLUListElement = createNewElement('ul', ['garage__tracks']);
        const cars: ICar[] = this.controller.getCars(STATE.currentPage);   
        if (cars.length) {
            for (const car of cars) {
                const carInstance = new Car(car['name'], car['color'], car['id']);
                const trackInstance = new Track(carInstance);
                const newTrack: HTMLLIElement = trackInstance.drawTrack(carInstance.name, carInstance.id);
                tracksWrapper?.append(newTrack);
            }
        }
        tracksWrapper.addEventListener('click', (event) => {
            if (event.target instanceof HTMLButtonElement) {
                const raceButton: HTMLButtonElement | null = document.querySelector('.race-control__race-btn');
                const resetButton: HTMLButtonElement | null = document.querySelector('.race-control__stop-btn');
                const track: HTMLLIElement | null = event.target.closest('.garage__track');

                if (event.target.classList.contains('road__button_drive')) {
                    if (raceButton) raceButton.disabled = true;
                    if (resetButton) resetButton.disabled = false;
                    if (track) this.startRace(track, 'drive');
                }

                if (event.target.classList.contains('road__button_stop')) {
                    if (raceButton) raceButton.disabled = false;
                    if (resetButton) resetButton.disabled = true;
                    if (track) this.resetRace(track);
                }
            }
        });

        return tracksWrapper;
    }

    async deleteTrack(button: HTMLElement) {
        const carsId = Number(button.getAttribute('data-id'));
        if (carsId) {
            await (async () => {
                await this.controller.deleteCar(carsId);
                await this.controller.deleteWinner(carsId);
            })();
        }
    }

    async updateCar(button: HTMLElement): Promise<boolean> {
        const carsId = Number(button.getAttribute('data-id'));
            const updateCarInstance = new UpdateCar();
            const updateCarWrapper = updateCarInstance.drawUpdateWrapper(carsId);
            const garageSection = document.querySelector('.section_garage');
            garageSection?.prepend(updateCarWrapper);

            return new Promise((resolve) => {
                const checkCondition = () => {
                    console.log(updateCarInstance.updated);
                    if (updateCarInstance.updated === true) {
                        clearInterval(interval);

                        return resolve(true);
                    }
                };
                const interval = setInterval(checkCondition, 100);
            });
        
    }

    async startRace(track: HTMLLIElement, type: string = 'drive') {
        const car: HTMLDivElement | null = track.querySelector('.car');
        const driveCarButton: HTMLButtonElement | null = track.querySelector('.road__button_drive');
        const stopCarButton: HTMLButtonElement | null = track.querySelector('.road__button_stop');
        const carsId = Number(track.getAttribute('data-id'));
        const finish: HTMLElement | null = track.querySelector('.road__finish');
        if (car instanceof HTMLElement) {
            if (car.classList.contains('stopped')) car.classList.remove('stopped');
            const {velocity, distance} = await this.controller.startEngine(carsId, 'started');
            const startPosition: number = car.getBoundingClientRect().left;
            const endPosition: number = finish ? finish.getBoundingClientRect().right : 
                track.getBoundingClientRect().right - car.clientWidth;
            const difference: number = endPosition - startPosition;

            const animateCar = async (distance: number, velocity: number) => {
                if (driveCarButton) driveCarButton.disabled = true;
                if (stopCarButton) stopCarButton.disabled = false;
                car.classList.add('animate');
                const racingTime: number = Math.round((distance / velocity));
                car.style.setProperty('--animation-duration', racingTime / 1000 + 's');
                car.style.transform = `translateX(${difference}px)`;
                try {
                    await this.controller.driveMode(carsId);
                    if (!car.classList.contains('stopped')) car.classList.add('finished');
                    if (type === 'race') {
                        if (!STATE.firstWinner) {
                            STATE.firstWinner = car;
                            if (!car.classList.contains('stopped')) {
                                STATE.firstWinner.classList.add('winner');
                                if (track.contains(STATE.firstWinner)) {
                                    track.classList.add('winner');
                                }
                                await this.controller.createWinner(carsId, racingTime / 1000);
                                this.winners.drawWinners();
                            }
                        }
                    }
                } catch {
                    if (!car.classList.contains('stopped')) {
                        car.style.transform = `translateX(${car.getBoundingClientRect().left - car.clientWidth}px)`;
                        car.classList.remove('animate');
                        car.classList.add('broken');
                    }
                }
            };

            return await animateCar(distance, velocity);
        }
    }

    async resetRace(track: HTMLLIElement) {
        track.classList.remove('winner');
        const car: HTMLElement | null = track.querySelector('.car');
        const driveCarButton: HTMLButtonElement | null = track.querySelector('.road__button_drive');
        const stopCarButton: HTMLButtonElement | null = track.querySelector('.road__button_stop');
        const carsId : number = Number(track.getAttribute('data-id'));
        try {
            this.controller.startEngine(carsId, 'stopped')
            .then(() => {
                if (car instanceof HTMLElement) {
                    car.classList.add('stopped');
                    if (car.classList.contains('finished')) car.classList.remove('finished');
                    if (car.classList.contains('broken')) car.classList.remove('broken');
                    if (car.classList.contains('animate')) car.classList.remove('animate');
                    if (car.classList.contains('winner')) car.classList.remove('winner');
                    car.style.transform = `translateX(${0}px)`;
                }
            });
            if (driveCarButton) driveCarButton.disabled = false;
            if (stopCarButton) stopCarButton.disabled = true;
        } catch (err) {
            console.log(err);
        }
    }
}