import './navigation.css';
import createNewElement from "../create-new-element";

export default class Navigation {
    main: HTMLElement | null = document.querySelector('main');

    drawNavigation() {
        const navWrapper: HTMLDivElement = createNewElement<HTMLDivElement>('div', ['nav-wrapper']);
		const garageBtn: HTMLButtonElement = createNewElement<HTMLButtonElement>('button',['nav__button', 'nav__button_garage'], {textContent: 'Garage', disabled: 'true'});
		const winnersBtn: HTMLButtonElement = createNewElement<HTMLButtonElement>('button', ['nav__button', 'nav__button_winners'], {textContent: 'Winners'});

        navWrapper.addEventListener('click', (event) => {
            const winnersSection = document.querySelector('.section_winners');
            const garageSection = document.querySelector('.section_garage');
            if (event.target === winnersBtn) {
                if (winnersSection?.classList.contains('hidden')) {
                    winnersSection.classList.remove('hidden');
                    garageSection?.classList.add('hidden');
                    garageBtn.disabled = false;
                    winnersBtn.disabled = true;
                    
                }
            }

            if (event.target === garageBtn) {
                if (garageSection?.classList.contains('hidden')) {
                    garageSection.classList.remove('hidden');
                    winnersSection?.classList.add('hidden');
                    garageBtn.disabled = true;
                    winnersBtn.disabled = false;
                }
            }
        });

        navWrapper.append(garageBtn);
        navWrapper.append(winnersBtn);
        return navWrapper;
    }
}