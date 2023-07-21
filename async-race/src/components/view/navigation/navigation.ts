import './navigation.css';
import createNewElement from "../create-new-element";
import Loader from '../../controller/loader';

export default class Navigation {
    main: HTMLElement | null = document.querySelector('main');
    loader = new Loader();

    drawNavigation() {
        this.main = document.querySelector('main');
        const navWrapper: HTMLDivElement = createNewElement<HTMLDivElement>('div', ['nav-wrapper']);
		const garageBtn: HTMLButtonElement = createNewElement<HTMLButtonElement>('button',['nav__button', 'nav__button_garage'], {textContent: 'Garage'});
		const winnersBtn: HTMLButtonElement = createNewElement<HTMLButtonElement>('button', ['nav__button', 'nav__button_winners'], {textContent: 'Winners'});

        garageBtn?.addEventListener('click', () => {
            this.loader.getGarage();
        });
        winnersBtn?.addEventListener('click', () => {
            this.loader.getWinners();
        });

        navWrapper.append(garageBtn);
        navWrapper.append(winnersBtn);
        this.main?.append(navWrapper);
    }
}