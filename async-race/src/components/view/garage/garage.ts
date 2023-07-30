import './garage.css';
import Controller from '../../controller/controller';
import { createNewElement } from '../../../utils/utils';
import Tracks from '../tracks/tracks';
import Pagination from '../pagination/pagination';
import STATE from '../../model/STATE';
import { CARS_NAMES, CARS_MODELS } from '../../model/STATE';
import { getRandomIndex, getRandomColor } from '../../../utils/utils';

export default class Garage {
    private controller = new Controller();
    private tracks = new Tracks();
    private pagination = new Pagination();

    async drawGarage() {
        let garageSection: HTMLElement | null = document.querySelector('.section_garage');
        if (garageSection) {
            garageSection.innerHTML = '';
        } else {
            garageSection = createNewElement('section', ['section', 'section_garage']);
        }
        const carEditor: HTMLDivElement = this.drawCarEditor();
        const generateButton: HTMLButtonElement = this.drawGenerateButton();
        const raceButtons: HTMLDivElement = this.drawRaceButtons();
        const garagePagination = this.drawPagination();
        const garageTitle = this.drawGarageTitle();
        const garageTracks = await this.drawTracks();

        garageSection.append(carEditor);
        garageSection.append(generateButton);
        garageSection.append(raceButtons);
        garageSection.append(garagePagination);
        garageSection.append(garageTitle);
        garageSection.append(garageTracks)
        ; 
        return garageSection;
    }

    private drawCarEditor() {
        const carEditor: HTMLDivElement = createNewElement('div', ['garage-editor']);
        const carEditorForm: HTMLDivElement = createNewElement('div', ['form_add']);
        const carEditorWrapper: HTMLDivElement = createNewElement('div', ['form__inputs-wrapper']);
        const carEditorName: HTMLInputElement = createNewElement('input', ['form__input', 'form__input_text'], {placeholder: 'Cars name'});
        const carEditorColor: HTMLInputElement = createNewElement('input', ['form__input', 'form__input_color'], {type: 'color'});
        const carEditorButton: HTMLButtonElement = createNewElement('button', ['form__button_add'], {textContent: 'Add'});

        carEditorButton.addEventListener('click', () => {
            this.editCar(carEditorName.value, carEditorColor.value);
        });

        carEditorWrapper.append(carEditorName);
        carEditorWrapper.append(carEditorColor);
        carEditorForm.append(carEditorWrapper);
        carEditorForm.append(carEditorButton);
        carEditor.append(carEditorForm);

        return carEditor;
    }

    private editCar(carName: string | null, carColor: string | null) {
        if (carName && carColor) {
            const response = this.controller.createCar(carName, carColor);
            response.then(() => this.drawGarage());
        } else {
            alert('Please, name a car!');
        }
    }

    private drawGenerateButton() {
        const generateButton: HTMLButtonElement = createNewElement('button', ['garage__generate-btn'], {textContent: 'GENERATE'});

        generateButton.addEventListener('click', () => {
            for (let i = 0; i <= 100; i++) {
                const randomCarName: string = CARS_NAMES[getRandomIndex(CARS_NAMES.length)];
                const randomCarModel: string = CARS_MODELS[getRandomIndex(CARS_MODELS.length)];
                const randomCarColor = getRandomColor();
                (async () => {
                    return await this.controller.createCar(`${randomCarName} ${randomCarModel}`, randomCarColor)
                    .then(() => {
                        if (i === 100) this.drawGarage();
                    });
                })();
            }
        });

        return generateButton;
    }

    private drawRaceButtons() {
        const raceButtons: HTMLDivElement = createNewElement('div', ['garage__race-control']);
        const raceButton: HTMLButtonElement = createNewElement('button', ['race-control_button', 'race-control__race-btn'], {textContent: 'RACE'});
        const stopButton: HTMLButtonElement = createNewElement('button', ['race-control_button', 'race-control__stop-btn'], {textContent: 'STOP'});
        stopButton.disabled = true;

        raceButtons.addEventListener('click', async (event) => {
            if (event.target instanceof HTMLElement) {
                if (event.target === raceButton) this.startRace();
                if (event.target === stopButton) this.resetRace();
            }
        });

        raceButtons.append(raceButton);
        raceButtons.append(stopButton);

        return raceButtons;
    }

    private startRace() {
        const raceButton: HTMLButtonElement | null = document.querySelector('.race-control__race-btn');
        const resetButton: HTMLButtonElement | null = document.querySelector('.race-control__stop-btn');

        if (raceButton) raceButton.disabled = true;
        if (resetButton) resetButton.disabled = false;

        const garageTracks: HTMLLIElement[] = Array.from(document.querySelectorAll('.garage__track'));

        garageTracks.map(async (track) => {
            this.tracks.startRace(track, 'race');
        });
        STATE.firstWinner = null;
    }

    private resetRace() {
        const raceButton: HTMLButtonElement | null = document.querySelector('.race-control__race-btn');
        const resetButton: HTMLButtonElement | null = document.querySelector('.race-control__stop-btn');

        if (raceButton) raceButton.disabled = false;
        if (resetButton) resetButton.disabled = true;

        const garageTracks: HTMLLIElement[] = Array.from(document.querySelectorAll('.garage__track'));

        Promise.all(garageTracks.map(async (track) => {
            this.tracks.resetRace(track);
        }));
    }

    private drawGarageTitle() {
        const garageTitle: HTMLHeadingElement = createNewElement<HTMLHeadingElement>('h2', ['section__title'], {textContent: `Garage (${STATE.cars.length})`});
        return garageTitle;
    }

    private drawPagination() {
        const pagination: HTMLElement = this.pagination.drawPagination();

        pagination.addEventListener('click', (event) => {
            if (event.target instanceof HTMLButtonElement) this.drawGarage();
        });

        return pagination;
    }

    private async drawTracks() {
        const tracksWrapper: HTMLUListElement = await this.tracks.drawTracksWrapper();

        tracksWrapper.addEventListener('click', async (event) => {
            if (event.target instanceof HTMLElement) {
                if (event.target.classList.contains('track__button_delete')) {
                    await this.tracks.deleteTrack(event.target);
                    this.drawGarage();
                }

                if (event.target.classList.contains('track__button_update')) {
                    await this.tracks.updateCar(event.target).then(() => {
                        this.drawGarage();
                    });
                }
            }
        });
        
        return tracksWrapper;
    }
}