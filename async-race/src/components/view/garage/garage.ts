import './garage.css';
import createNewElement from "../create-new-element";

export default class Garage {
    main: HTMLElement | null = document.querySelector('main');

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
        
    }

    drawCars(data: Car[]) {
        // const garageSection = document.querySelector('.section_garage');
        if (data) {
            for (const car of data) {
                // const row = createNewElement('div', ['car']);
                console.log(car['name']);
                console.log(car);
            }
        }
    }
}

type Car = Record<string, string>;