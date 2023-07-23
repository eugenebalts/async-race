import './garage.css';
import Controller from '../../controller/controller';
import createNewElement from "../create-new-element";
import Tracks from '../tracks/tracks';
import STATE from '../../model/STATE';

export default class Garage {
    controller = new Controller();
    main: HTMLElement | null = document.querySelector('main');
    tracks = new Tracks();

    async drawGarage() {
        const garageSection = createNewElement<HTMLElement>('section', ['section', 'section_garage']);
        const garageEditor = this.drawGarageEditor();
        const garageTitle = this.drawGarageTitle();
        const garageTracks = await this.drawTracks();

        garageSection.append(garageEditor);
        garageSection.append(garageTitle);
        garageSection.append(garageTracks);
        return garageSection;
    }

    drawGarageEditor() {
        const garageEditor = createNewElement<HTMLDivElement>('div', ['garage-editor']);

        const newCarForm: HTMLFormElement = createNewElement<HTMLFormElement>('div', ['form_add']);

        const inputsWrapper = createNewElement('div', ['form__inputs-wrapper']);
        const newCarInput: HTMLInputElement = createNewElement<HTMLInputElement>('input', ['form__input', 'form__input_text'], {placeholder: 'Cars name'});
        const newCarColor: HTMLInputElement = createNewElement<HTMLInputElement>('input', ['form__input', 'form__input_color'], {type: 'color'});
        const newCarButton = createNewElement('button', ['form__button_add'], {textContent: 'Add'});

        inputsWrapper.append(newCarInput);
        inputsWrapper.append(newCarColor);
        newCarForm.append(inputsWrapper);
        newCarForm.append(newCarButton);


        garageEditor.append(newCarForm);

        return garageEditor;
    }

    drawGarageTitle() {
        const garageTitle = createNewElement<HTMLHeadingElement>('h2', ['section__title'], {textContent: `Garage (${STATE.cars.length})`});
        return garageTitle;
    }

    drawTracks() {
        const tracksWrapper = this.tracks.drawTracksWrapper();

        return tracksWrapper;
    }



    // drawPagination() {

    // }

    



    // async drawGarage() {
    //     this.main = document.querySelector('main');
    //     const garageSection = createNewElement<HTMLElement>('section', ['section', 'section_garage']);
    //     const garageEditor = createNewElement<HTMLDivElement>('div', ['garage-editor']);

    //     const newCarForm: HTMLFormElement = createNewElement<HTMLFormElement>('div', ['form_add']);
    //     const inputsWrapper = createNewElement('div', ['form__inputs-wrapper']);
    //     const newCarInput: HTMLInputElement = createNewElement<HTMLInputElement>('input', ['form__input', 'form__input_text'], {placeholder: 'Cars name'});
    //     const newCarColor: HTMLInputElement = createNewElement<HTMLInputElement>('input', ['form__input', 'form__input_color'], {type: 'color'});
    //     const newCarButton = createNewElement('button', ['form__button_add'], {textContent: 'Add'});

    //     inputsWrapper.append(newCarInput);
    //     inputsWrapper.append(newCarColor);
    //     newCarForm.append(inputsWrapper);
    //     newCarForm.append(newCarButton);


    //     garageEditor.append(newCarForm);
    //     garageSection.append(garageEditor);

    //     const garageTitle = createNewElement<HTMLHeadingElement>('h2', ['section__title'], {textContent: `Garage (${STATE.cars.length})`});
    //     garageSection.append(garageTitle);
    //     this.main?.append(garageSection);
    //     this.tracks.drawTracksWrapper();

    //     newCarButton.addEventListener('click', () => {
    //         const carNameValue: string | null = newCarInput.value;
    //         const carColorValue: string | null = newCarColor.value;
            
    //         if (carNameValue && carColorValue) {
    //             const response = this.controller.createCar(carNameValue, carColorValue);
    //             response.then(() => this.drawGarage());
    //         }
    //     });

    // }
}