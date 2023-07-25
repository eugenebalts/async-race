import './pagination.css';
import createNewElement from "../create-new-element";
import STATE from "../../model/STATE";

export default class Pagination {
    section;
    constructor(section: string = 'garage') {
        this.section = section;
    }

    drawPagination() {
        const pagination = createNewElement('div', ['pagination']);

        const paginationTitle = this.drawTitle();
        const paginationButtons = this.drawButtons();

        pagination.append(paginationTitle);
        pagination.append(paginationButtons);

        return pagination;
    }

    drawTitle() {
        
        const paginationTitle = createNewElement('h3', ['pagination__title']);

            paginationTitle.textContent = `Page №${this.section === "garage" ? STATE.currentPage : STATE.currentWinnersPage}`;
        
        return paginationTitle;
    }

    drawButtons() {
        const paginationButtons = createNewElement('div', ['pagination__buttons']);

        const prevButton = createNewElement('button', ['pagination__button', 'pagination__button_prev'], {textContent: '<'});
        const nextButton = createNewElement('button', ['pagination__button', 'pagination__button_next'], {textContent: '>'});


        
        if (this.section === 'winners') {
            prevButton.classList.add('pagination_winners__button_prev');
                nextButton.classList.add('pagination_winners__button_next');
            if (STATE.currentWinnersPage === STATE.winnersPages) {
                nextButton.setAttribute('disabled', 'true');
            }
            if (STATE.currentWinnersPage === 1) {
                prevButton.setAttribute('disabled', 'true');
            }
        } else {
                prevButton.classList.add('pagination_garage__button_prev');
                nextButton.classList.add('pagination_garage__button_next');
            if (STATE.currentPage === STATE.maxPage) {
                nextButton.setAttribute('disabled', 'true');
            }
            if (STATE.currentPage === 1) {
                prevButton.setAttribute('disabled', 'true');
            }
        }


        paginationButtons.append(prevButton);
        paginationButtons.append(nextButton);
        return paginationButtons;
    }
}