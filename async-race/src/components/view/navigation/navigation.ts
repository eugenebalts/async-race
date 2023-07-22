import './navigation.css';
import createNewElement from "../create-new-element";

export default class Navigation {
    main: HTMLElement | null = document.querySelector('main');

    drawNavigation() {
        this.main = document.querySelector('main');
        const navWrapper: HTMLDivElement = createNewElement<HTMLDivElement>('div', ['nav-wrapper']);
		const garageBtn: HTMLButtonElement = createNewElement<HTMLButtonElement>('button',['nav__button', 'nav__button_garage', 'nav__button_active'], {textContent: 'Garage'});
		const winnersBtn: HTMLButtonElement = createNewElement<HTMLButtonElement>('button', ['nav__button', 'nav__button_winners'], {textContent: 'Winners'});

        navWrapper.append(garageBtn);
        navWrapper.append(winnersBtn);
        this.main?.append(navWrapper);
    }
}