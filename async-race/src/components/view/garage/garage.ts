import './garage.css';
import Controller from '../../controller/controller';
import createNewElement from "../create-new-element";
// import Car from '../car/car';
import Tracks from '../tracks/tracks';

export default class Garage {
    controller = new Controller();
    main: HTMLElement | null = document.querySelector('main');
    tracks = new Tracks();

    drawGarage() {
        this.main = document.querySelector('main');
        const garageSection = createNewElement<HTMLElement>('section', ['section', 'section_garage']);
        const garageEditor = createNewElement<HTMLDivElement>('div', ['garage-editor']);
        const newCarWrapper: HTMLFormElement = createNewElement<HTMLFormElement>('form', ['form_new-car']);

        const newCarInput: HTMLInputElement = createNewElement<HTMLInputElement>('input', ['form__input', 'form__input-text_new-car'], {placeholder: 'Type car name'});
        const newCarColor: HTMLInputElement = createNewElement<HTMLInputElement>('input', ['form__input', 'form__input-color_new-car'], {type: 'color'});
        const newCarButton: HTMLButtonElement = createNewElement<HTMLButtonElement>('button', ['form__button', 'form__button_new-car'], {textContent: 'Create', disabled: true});

        newCarWrapper.append(newCarInput);
        newCarWrapper.append(newCarColor);
        newCarWrapper.append(newCarButton);

        garageEditor.append(newCarWrapper);
        garageSection.append(garageEditor);

        const garageTitle = createNewElement<HTMLHeadingElement>('h2', ['section__title'], {textContent: `Your garage consists of ${this.main} vehicles`});
        garageSection.append(garageTitle);
        this.main?.append(garageSection);
        this.tracks.drawTracksWrapper();
    }
}

// type TCar = Record<string, string>;