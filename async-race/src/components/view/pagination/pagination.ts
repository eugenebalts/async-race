import './pagination.css';
import createNewElement from '../create-new-element';
import STATE from '../../model/STATE';

export default class Pagination {
    section: string;
    constructor(section: string = 'garage') {
        this.section = section;
    }

    public drawPagination() {
        const pagination: HTMLDivElement = createNewElement('div', ['pagination']);
        const paginationTitle: HTMLHeadingElement = this.drawTitle();
        const paginationButtons: HTMLDivElement = this.drawButtons();

        pagination.append(paginationTitle);
        pagination.append(paginationButtons);

        return pagination;
    }

    private drawTitle() {
        const paginationTitle: HTMLHeadingElement = createNewElement('h3', ['pagination__title']);
        paginationTitle.textContent = `Page №${this.section === "garage" ? STATE.currentPage : STATE.currentWinnersPage}`;
        
        return paginationTitle;
    }

    private drawButtons() {
        const paginationButtons: HTMLDivElement = createNewElement('div', ['pagination__buttons']);
        const prevButtonClass: string = this.section === 'garage' ?
            'pagination_garage__button_prev' : 'pagination_winners__button_prev';
        const nextButtonClass: string = this.section === 'garage' ?
            'pagination_garage__button_next' : 'pagination_winners__button_next';
        const prevButton: HTMLButtonElement = createNewElement('button', ['pagination__button',
            'pagination__button_prev', prevButtonClass], {textContent: '<'});
        const nextButton: HTMLButtonElement = createNewElement('button', ['pagination__button',
            'pagination__button_next', nextButtonClass], {textContent: '>'});

        const currentPage: number = this.section === 'garage' ?
            STATE.currentPage : STATE.currentWinnersPage;
        const maxPage: number = this.section === 'garage' ? 
            STATE.maxPage : STATE.winnersPages;

        if (currentPage === maxPage) nextButton.disabled = true;
        if (currentPage === 1) prevButton.disabled = true;

        paginationButtons.addEventListener('click', (event) => {
            if (event.target instanceof HTMLButtonElement) {
                const prevButton: HTMLButtonElement | null = this.section === 'garage' ? 
                    document.querySelector('.pagination_garage__button_prev') : 
                    document.querySelector('.pagination_winners__button_prev');
                const nextButton: HTMLButtonElement | null = this.section === 'garage' ? 
                    document.querySelector('.pagination_garage__button_next') : 
                    document.querySelector('.pagination_winners__button_next');
                const currentPage: number = this.section === 'garage' ?
                    STATE.currentPage : STATE.currentWinnersPage;
                const maxPage: number = this.section === 'garage' ? 
                    STATE.maxPage : STATE.winnersPages;

                if (event.target === prevButton) this.previousButton(prevButton, nextButton, currentPage, maxPage);
                if (event.target === nextButton) this.nextButton(prevButton, nextButton, currentPage, maxPage);
            }
        });

        paginationButtons.append(prevButton);
        paginationButtons.append(nextButton);
        return paginationButtons;
    }

    private previousButton(prevButton: HTMLButtonElement | null,
        nextButton: HTMLButtonElement | null, currentPage: number, maxPage: number) {
        if (currentPage > 1) {    
            this.section === 'garage' ? STATE.currentPage -= 1 : STATE.currentWinnersPage -= 1;
            if (currentPage === 1) {
                if (prevButton) prevButton.disabled = true;
            }
            if (currentPage < maxPage) {
                if (nextButton) {
                    if (nextButton.disabled) nextButton.disabled = false;
                }
            }
        }
    }

    private nextButton(prevButton: HTMLButtonElement | null,
        nextButton: HTMLButtonElement | null, currentPage: number, maxPage: number) {
        if (currentPage < maxPage) {
            this.section === 'garage' ? STATE.currentPage += 1 : STATE.currentWinnersPage += 1;
            if (currentPage === maxPage) nextButton?.setAttribute('disabled', 'true');
            if (currentPage > 1) {
                if (prevButton) {
                    if (prevButton.disabled) prevButton.disabled = false;
                }
            }
        }
    }
}