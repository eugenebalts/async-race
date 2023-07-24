import './garage.css';
import Controller from '../../controller/controller';
import createNewElement from "../create-new-element";
import Tracks from '../tracks/tracks';
import Pagination from '../pagination/pagination';
import STATE from '../../model/STATE';
import { carNames, carModels } from '../../model/STATE';
import UpdateCar from '../update-car/update-car';

export default class Garage {
    controller = new Controller();
    main: HTMLElement | null = document.querySelector('main');
    tracks = new Tracks();
    pagination = new Pagination();

    public async drawGarage() {
        let garageSection = document.querySelector('.section_garage');
        if (garageSection) {
            for (let i = 1; i < garageSection.children.length; i++) {
                const child = garageSection.children[i];
                garageSection.removeChild(child);
            }
            garageSection.innerHTML = '';
        } else {
            garageSection = createNewElement<HTMLElement>('section', ['section', 'section_garage']);
        }
        const garageEditor = this.drawGarageEditor();
        const generateButton = this.drawGenerateButton();
        const raceButtons = this.drawRaceButtons();
        const garagePagination = this.drawPagination();
        const garageTitle = this.drawGarageTitle();
        const garageTracks = await this.drawTracks();

        garageSection.append(garageEditor);
        garageSection.append(generateButton);
        garageSection.append(raceButtons);
        garageSection.append(garagePagination);
        garageSection.append(garageTitle);
        garageSection.append(garageTracks); 
        return garageSection;
    }

    async redrawGarage() {
        this.drawGarage();
    }

    private drawGarageEditor() {
        const garageEditor = createNewElement<HTMLDivElement>('div', ['garage-editor']);

        const newCarForm: HTMLFormElement = createNewElement<HTMLFormElement>('div', ['form_add']);

        const inputsWrapper = createNewElement('div', ['form__inputs-wrapper']);
        const newCarInput: HTMLInputElement = createNewElement<HTMLInputElement>('input', ['form__input', 'form__input_text'], {placeholder: 'Cars name'});
        const newCarColor: HTMLInputElement = createNewElement<HTMLInputElement>('input', ['form__input', 'form__input_color'], {type: 'color'});
        const newCarButton = createNewElement('button', ['form__button_add'], {textContent: 'Add'});

        newCarButton.addEventListener('click', () => {
            const carsName: string | null = newCarInput.value;
            const carsColor: string | null = newCarColor.value;
            if (carsName && carsColor) {
                const response = this.controller.createCar(carsName, carsColor);
                response.then(() => this.redrawGarage());
            } else {
                alert('Please, name a car!');
            }
        });

        inputsWrapper.append(newCarInput);
        inputsWrapper.append(newCarColor);
        newCarForm.append(inputsWrapper);
        newCarForm.append(newCarButton);

        garageEditor.append(newCarForm);

        return garageEditor;
    }

    drawGenerateButton() {
        const generateButton = createNewElement('button', ['garage__generate-btn'], {textContent: 'GENERATE'});

        generateButton.addEventListener('click', () => {
            function getRandomIndex(length: number) {
                return Math.floor(Math.random() * (length - 1));
            }

            function getRandomColor() {
                const letters = "0123456789ABCDEF";
                let color = "#";
                for (let i = 0; i < 6; i++) {
                  color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }

            for (let i = 0; i <= 100; i++) {
                const randomCar = carNames[getRandomIndex(carNames.length)];
                const randomModel = carModels[getRandomIndex(carModels.length)];
                const randomColor = getRandomColor();
                (async () => {
                    return await this.controller.createCar(`${randomCar} ${randomModel}`, randomColor)
                    .then(() => {
                        if (i === 100) this.redrawGarage();
                    });
                })();
            }
        });

        return generateButton;
    }

    drawRaceButtons() {
        const raceButtons = createNewElement('div', ['garage__race-control']);
        const raceButton = createNewElement('button', ['race-control_button', 'race-control__race-btn'], {textContent: 'RACE'});
        const stopButton = createNewElement('button', ['race-control_button', 'race-control__stop-btn'], {textContent: 'STOP'});

        raceButton.addEventListener('click', () => {
            
        });

        raceButtons.append(raceButton);
        raceButtons.append(stopButton);
        return raceButtons;
    }

    private drawGarageTitle() {
        const garageTitle = createNewElement<HTMLHeadingElement>('h2', ['section__title'], {textContent: `Garage (${STATE.cars.length})`});
        return garageTitle;
    }

    private drawPagination() {
        const pagination = this.pagination.drawPagination();
        // const paginationTitle = pagination.children[0];
        const prevButton = document.querySelector('.pagination__button_prev');
        const nextButton = document.querySelector('.pagination__button_next');

        pagination.addEventListener('click', (event) => {
            if (event.target instanceof HTMLElement) {
                // PREV BTN
                if (event.target.classList.contains('pagination__button_prev')) {
                    if (STATE.currentPage > 1) {
                        STATE.currentPage -= 1;
                        if (STATE.currentPage === 1) event.target.setAttribute('disabled', 'true');
                        if (STATE.currentPage < STATE.maxPage) {
                            if (nextButton) {
                                if (nextButton.getAttribute('disabled')) nextButton.removeAttribute('disabled');
                            }
                        }
                        // if (paginationTitle) paginationTitle.textContent = `Page №${STATE.currentPage}`;
                    }
                    this.redrawGarage();
                }

                //NEXT BTN
                if (event.target.classList.contains('pagination__button_next')) {
                    if (STATE.currentPage < STATE.maxPage) {
                        STATE.currentPage += 1;
                        if (STATE.currentPage === STATE.maxPage) event.target.setAttribute('disabled', 'true');
                        if (STATE.currentPage > 1) {
                            if (prevButton) {
                                if (prevButton.getAttribute('disabled')) prevButton.removeAttribute('disabled');
                            }
                        }
                        // if (paginationTitle) paginationTitle.textContent = `Page №${STATE.currentPage}`;
                    }
                    this.redrawGarage();
                }
            }
        });

        return pagination;
    }

    private async drawTracks() {
        const tracksWrapper = await this.tracks.drawTracksWrapper();

        tracksWrapper.addEventListener('click', (event) => {
            if (event.target instanceof HTMLElement) {
                if (event.target.classList.contains('track__button_delete')) {
                    const carsId = Number(event.target.getAttribute('data-id'));
                    if (carsId) {
                        (async () => {
                            await this.controller.deleteCar(carsId);
                            this.redrawGarage();
                        })();
                        
                    }
                }

                if (event.target.classList.contains('track__button_update')) {
                    const carsId = Number(event.target.getAttribute('data-id'));
                    if (carsId) {
                        const updateCarInstance = new UpdateCar();
                        const updateCarWrapper = updateCarInstance.drawUpdateWrapper(carsId);
                        const garageSection = document.querySelector('.section_garage');
                        garageSection?.prepend(updateCarWrapper);

                        const checkCondition = () => {
                            if (updateCarInstance.updated === true) {
                                clearInterval(interval);
                                this.redrawGarage();
                            }
                        };

                        const interval = setInterval(checkCondition, 100);
                    }
                }
            }
        });
        return tracksWrapper;
    }
}