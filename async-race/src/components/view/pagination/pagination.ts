import './pagination.css';
import createNewElement from "../create-new-element";
import STATE from "../../model/STATE";

export default class Pagination {
    drawPagination() {
        const pagination = createNewElement('div', ['pagination']);

        const paginationTitle = this.drawTitle();
        const paginationButtons = this.drawButtons();

        pagination.append(paginationTitle);
        pagination.append(paginationButtons);

        return pagination;
    }

    drawTitle() {
        const paginationTitle = createNewElement('h3', ['pagination__title'], {textContent: `Page №${STATE.currentPage}`});
        return paginationTitle;
    }

    drawButtons() {
        const paginationButtons = createNewElement('div', ['pagination__buttons']);

        const prevButton = createNewElement('button', ['pagination__button', 'pagination__button_prev'], {textContent: '<'});
        const nextButton = createNewElement('button', ['pagination__button', 'pagination__button_next'], {textContent: '>'});

        if (STATE.currentPage === 1) {
            prevButton.setAttribute('disabled', 'true');
        }
        if (STATE.currentPage === STATE.maxPage) {
            nextButton.setAttribute('disabled', 'true');
        }

        paginationButtons.append(prevButton);
        paginationButtons.append(nextButton);
        return paginationButtons;
    }
}