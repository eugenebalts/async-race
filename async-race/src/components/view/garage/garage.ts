import './garage.css';
import Controller from '../../controller/controller';
import createNewElement from "../create-new-element";
import Tracks from '../tracks/tracks';

export default class Garage {
    controller = new Controller();
    main: HTMLElement | null = document.querySelector('main');
    tracks = new Tracks();

    drawGarage() {
        this.main = document.querySelector('main');
        const garageSection = createNewElement<HTMLElement>('section', ['section', 'section_garage']);
        const garageEditor = createNewElement<HTMLDivElement>('div', ['garage-editor']);

        const newCarForm: HTMLFormElement = createNewElement<HTMLFormElement>('form', ['form_add']);
        const inputsWrapper = createNewElement('div', ['form__inputs-wrapper']);
        const newCarInput: HTMLInputElement = createNewElement<HTMLInputElement>('input', ['form__input', 'form__input_text'], {placeholder: 'Cars name'});
        const newCarColor: HTMLInputElement = createNewElement<HTMLInputElement>('input', ['form__input', 'form__input_color'], {type: 'color'});
        const newCarButton = createNewElement('button', ['form__button_add'], {textContent: 'Add'});

        inputsWrapper.append(newCarInput);
        inputsWrapper.append(newCarColor);
        newCarForm.append(inputsWrapper);
        newCarForm.append(newCarButton);


        garageEditor.append(newCarForm);
        garageSection.append(garageEditor);

        const garageTitle = createNewElement<HTMLHeadingElement>('h2', ['section__title'], {textContent: `Garage ()`});
        garageSection.append(garageTitle);
        this.main?.append(garageSection);
        this.tracks.drawTracksWrapper();
    }
}