import './winners.css';
import { createNewElement } from '../../../utils/utils';
import STATE from '../../model/STATE';
import Pagination from '../pagination/pagination';
import Car from '../car/car';
import { ICar, IWinner } from '../../types/types';

export default class Winners {
    private pagination = new Pagination('winners');

    async drawWinners() {
        let winnersSection: HTMLElement | null = document.querySelector('.section_winners');
        if (winnersSection) {
            for (let i = 1; i < winnersSection.children.length; i++) {
                const child: Element = winnersSection.children[i];
                winnersSection.removeChild(child);
            }
            winnersSection.innerHTML = '';
        } else {
            winnersSection = createNewElement('section', ['section', 'section_winners', 'hidden']);
        }
        const winnersTitle: HTMLHeadingElement = this.drawTitle();
        const pagination: HTMLDivElement = this.drawPagination();
        const winnersContainer: HTMLDivElement = this.drawWinnersContainer();

        winnersSection.append(winnersTitle);
        winnersSection.append(pagination);
        winnersSection.append(winnersContainer);

        return winnersSection;
    }

    private drawPagination() {
        const pagination: HTMLDivElement = this.pagination.drawPagination();

        pagination.addEventListener('click', () => {
            this.drawWinners();
        });

        return pagination;
    }

    private drawTitle() {
        const winnersTitle: HTMLHeadingElement = createNewElement('h2', ['section__title'], {textContent: `Winners (${STATE.winners.length})`});

        return winnersTitle;
    }

    private drawWinnersContainer() {
        const winnersContainer: HTMLDivElement = createNewElement('div', ['winners__container']);
        const winnersHeader: HTMLDivElement = createNewElement('div', ['winners__row', 'winners__row_header']);
        const winnersNumber: HTMLDivElement = createNewElement('div', ['row__item'], {textContent: 'Number'});
        const winnersName: HTMLDivElement = createNewElement('div', ['row__item'], {textContent: 'Name'});
        const winnersCar: HTMLDivElement = createNewElement('div', ['row__item'], {textContent: 'Car'});
        const winnersWins: HTMLDivElement = createNewElement('div', ['row__item'], {textContent: 'Wins'});
        const winnersTime: HTMLDivElement = createNewElement('div', ['row__item'], {textContent: 'Time (sec)'});

        winnersHeader.append(winnersNumber);
        winnersHeader.append(winnersName);
        winnersHeader.append(winnersCar);
        winnersHeader.append(winnersWins);
        winnersHeader.append(winnersTime);
        winnersContainer.append(winnersHeader);

        const allWinners: IWinner[] = STATE.winners.slice((STATE.currentWinnersPage - 1) *
            STATE.winnersOnPage, ((STATE.currentWinnersPage - 1) * STATE.winnersOnPage) + STATE.winnersOnPage);

        allWinners.forEach(async (winner, index) => {
            const carsArray = STATE.cars.filter((item) => item.id === winner.id);
            if (carsArray.length) {
                const carInfo: ICar = carsArray[0];
                const carName: string = carInfo.name;
                const carColor: string = carInfo.color;
                const carId: number = carInfo.id;
                const carImage = new Car(carName, carColor, carId).createCar();
                const winnersRow: HTMLDivElement = createNewElement('div', ['winners__row']);
                const winnersNumber: HTMLDivElement = createNewElement('div', ['row__item', 'row__item_number'], {textContent: `${index + 1}`});
                const winnersName: HTMLDivElement = createNewElement('div', ['row__item', 'row__item_name'], {textContent: `${carName} №${carId}`});
                const winnersCar: HTMLDivElement = createNewElement('div', ['row__item', 'row__item_car']);
                const winnersWins: HTMLDivElement = createNewElement('div', ['row__item', 'row__item_wins'], {textContent: `${winner.wins}`});
                const winnersTime: HTMLDivElement = createNewElement('div', ['row__item', 'row__item_time'], {textContent: `${winner.time}`});

                winnersCar.append(carImage);

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