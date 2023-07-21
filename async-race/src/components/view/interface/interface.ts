import './interface.css';
import Loader from '../../controller/loader';

export default class Interface {
	body: HTMLBodyElement | null = document.querySelector('body');
    container: HTMLDivElement | null = document.querySelector('.container');
    loader = new Loader();
    
	renderInterface() {
        this.createContainer();
        this.drawHeader();
		this.drawNavigation();
        this.drawInputs();
        this.setListeners();
	}
    
    createContainer() {
        const container: HTMLDivElement = this.createNewElement('div', ['container']);
        this.container = container;
        this.body?.append(container);
    }

    drawHeader() {
        const header: HTMLHeadingElement = this.createNewElement('header', ['header']);
        const headerTitle: HTMLHeadElement = this.createNewElement('h1', ['header__title'], {innerHTML: 'NEED<span>FOR</span><br>ASYNC<br><span>RASING</span>'});
        header.append(headerTitle);
        this.container?.append(header);
    }

    drawNavigation() {
        const navWrapper: HTMLDivElement = this.createNewElement<HTMLDivElement>('div', ['nav-wrapper']);
		const garageBtn: HTMLButtonElement = this.createNewElement<HTMLButtonElement>('button',['nav__button', 'nav__button_garage'], {textContent: 'Garage'});
		const winnersBtn: HTMLButtonElement = this.createNewElement<HTMLButtonElement>('button', ['nav__button', 'nav__button_winners'], {textContent: 'Winners'});

        navWrapper.append(garageBtn);
        navWrapper.append(winnersBtn);
        this.container?.append(navWrapper);
    }

    drawInputs() {
        const inputsWrapper: HTMLDivElement = this.createNewElement<HTMLDivElement>('div', ['inputs-wrapper']);

        const createWrapper: HTMLFormElement = this.createNewElement<HTMLFormElement>('form', ['form_create']);
        const inputCreate: HTMLInputElement = this.createNewElement<HTMLInputElement>('input', ['form__input', 'form__input_create']);
        const colorSelectionCreate: HTMLInputElement = this.createNewElement<HTMLInputElement>('input', ['form__input'], {type: 'color'});
        const createButton: HTMLButtonElement = this.createNewElement<HTMLButtonElement>('button', ['form__button', 'form__button_create'], {textContent: 'Create', disabled: true});

        // const updateWrapper: HTMLFormElement = this.createNewElement<HTMLFormElement>('form', ['form_create']);
        // const inputUpdate: HTMLInputElement = this.createNewElement<HTMLInputElement>('input', ['form__input', 'form__input_create']);
        // const colorSelectionUpdate: HTMLElement = this.createNewElement<HTMLElement>('input', ['form__input'], {type: 'color'});
        // const updateButton: HTMLElement = this.createNewElement('button', ['form__button', 'form__button_update'], {textContent: 'Update', disabled: true});


        createWrapper.append(inputCreate);
        createWrapper.append(colorSelectionCreate);
        createWrapper.append(createButton);
        inputsWrapper.append(createWrapper);

        // updateWrapper.append(inputUpdate);
        // updateWrapper.append(colorSelectionUpdate);
        // updateWrapper.append(updateButton);
        // inputsWrapper.append(updateWrapper);
        
        this.container?.append(inputsWrapper);
    }

	private createNewElement<T extends HTMLElement>(element: string, classes: string[], options?: Options) {
		const newElement = <T>document.createElement(element);
        for (const className of classes) {
            newElement.classList.add(className);
        }
		
        if (options) {
            for (const key in options) {
                (newElement as unknown as Options)[key] = options[key];
            }
        }
		return newElement;
	}

    setListeners() {
        const garageBtn = document.querySelector('.nav__button_garage');
        const winnersBtn = document.querySelector('.nav__button_winners');

        garageBtn?.addEventListener('click', () => {
            this.loader.getGarage();
        });
        winnersBtn?.addEventListener('click', () => {
            this.loader.getWinners();
        });
    }
}

interface Options {
    [key: string]: string | boolean;    
}