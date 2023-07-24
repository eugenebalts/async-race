import './winners.css';
import createNewElement from '../create-new-element';

export default class Winners {
    main: HTMLElement | null = document.querySelector('main');

    drawWinners() {
        this.main = document.querySelector('main');
        const winnersSection = createNewElement<HTMLElement>('section', ['section', 'section_winners']);
        winnersSection.style.display = 'none';
        const winnersTitle = createNewElement<HTMLHeadingElement>('h2', ['section__title'], {textContent: `Winners`});
        winnersSection.append(winnersTitle);
        this.main?.append(winnersSection); 
    }
}