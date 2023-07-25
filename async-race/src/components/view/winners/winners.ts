import './winners.css';
import createNewElement from '../create-new-element';
import STATE from '../../model/STATE';
import Pagination from '../pagination/pagination';
import Car from '../car/car';

export default class Winners {
    pagination = new Pagination('winners');
    main: HTMLElement | null = document.querySelector('main');


    async drawWinners() {
        let winnersSection = document.querySelector('.section_winners');
        if (winnersSection) {
            for (let i = 1; i < winnersSection.children.length; i++) {
                const child = winnersSection.children[i];
                winnersSection.removeChild(child);
            }
            winnersSection.innerHTML = '';
        } else {
            winnersSection = createNewElement<HTMLElement>('section', ['section', 'section_winners', 'hidden']);
        }
        const winnersTitle = this.drawTitle();
        const pagination = this.drawPagination();
        this.drawWinnersContainer();
        winnersSection.append(winnersTitle);
        winnersSection.append(pagination);
        winnersSection.append(this.drawWinnersContainer());
        return winnersSection;
    }

    drawPagination() {
        const pagination = this.pagination.drawPagination();

        const prevButton = document.querySelector('.pagination_winners__button_prev');
        const nextButton = document.querySelector('.pagination_winners__button_next');

        pagination.addEventListener('click', (event) => {
            if (event.target instanceof HTMLElement) {
                // PREV BTN
                if (event.target.classList.contains('pagination_winners__button_prev')) {
                    if (STATE.currentWinnersPage > 1) {
                        STATE.currentWinnersPage -= 1;
                        if (STATE.currentWinnersPage === 1) event.target.setAttribute('disabled', 'true');
                        if (STATE.currentWinnersPage < STATE.winnersPages) {
                            if (nextButton) {
                                if (nextButton.getAttribute('disabled')) nextButton.removeAttribute('disabled');
                            }
                        }
                        // if (paginationTitle) paginationTitle.textContent = `Page №${STATE.currentPage}`;
                    }
                    this.redrawWinners();
                }

                //NEXT BTN


                if (event.target.classList.contains('pagination_winners__button_next')) {
                    if (STATE.currentWinnersPage < STATE.winnersPages) {
                        STATE.currentWinnersPage += 1;                        
                        if (STATE.currentWinnersPage === STATE.winnersPages) {
                            event.target.setAttribute('disabled', 'true');
                        }
                        if (STATE.currentWinnersPage > 1) {
                            if (prevButton) {
                                if (prevButton.getAttribute('disabled')) prevButton.removeAttribute('disabled');
                            }
                        }
                        // if (paginationTitle) paginationTitle.textContent = `Page №${STATE.currentPage}`;
                    }
                    this.redrawWinners();
                }


            }
        });

        return pagination;
    }

    


    async redrawWinners() {
        this.drawWinners();
    }

    drawTitle() {
        const winnersTitle = createNewElement<HTMLHeadingElement>('h2', ['section__title'], {textContent: `Winners (${STATE.winners.length})`});
        return winnersTitle;
    }

    drawWinnersContainer() {
        const winnersContainer = createNewElement('div', ['winners__container']);
        const allWinners = STATE.winners.slice((STATE.currentWinnersPage - 1) * STATE.winnersOnPage, ((STATE.currentWinnersPage - 1) * STATE.winnersOnPage) + STATE.winnersOnPage);

        const winnersHeader = createNewElement('div', ['winners__row', 'winners__row_header']);

        const winnersNumber = createNewElement('div', ['row__item'], {textContent: 'Number'});
        const winnersName = createNewElement('div', ['row__item'], {textContent: 'Name'});
        const winnersCar = createNewElement('div', ['row__item'], {textContent: 'Car'});
        const winnersWins = createNewElement('div', ['row__item'], {textContent: 'Wins'});
        const winnersTime = createNewElement('div', ['row__item'], {textContent: 'Time (sec)'});

        winnersHeader.append(winnersNumber);
        winnersHeader.append(winnersName);
        winnersHeader.append(winnersCar);
        winnersHeader.append(winnersWins);
        winnersHeader.append(winnersTime);

        winnersContainer.append(winnersHeader);



        allWinners.forEach(async (winner, index) => {
            const carsArray = STATE.cars.filter((item) => item.id === winner.id);
            if (carsArray.length) {
                const carInfo = carsArray[0];
                const carName = carInfo.name;
                const carColor = carInfo.color;
                const carId = carInfo.id;

                const carImage = new Car(carName, carColor, carId).createCar();

                const winnersRow = createNewElement('div', ['winners__row']);

                const winnersNumber = createNewElement('div', ['row__item', 'row__item_number'], {textContent: `${index + 1}`});
                const winnersName = createNewElement('div', ['row__item', 'row__item_name'], {textContent: `${carName} №${carId}`});
                const winnersCar = createNewElement('div', ['row__item', 'row__item_car']);
                winnersCar.append(carImage);
                const winnersWins = createNewElement('div', ['row__item', 'row__item_wins'], {textContent: `${winner.wins}`});
                const winnersTime = createNewElement('div', ['row__item', 'row__item_time'], {textContent: `${winner.time}`});

                winnersRow.append(winnersNumber);
                winnersRow.append(winnersName);
                winnersRow.append(winnersCar);
                winnersRow.append(winnersWins);
                winnersRow.append(winnersTime);

                winnersContainer.append(winnersRow);
            }
        });
        return winnersContainer;
    }

    
}