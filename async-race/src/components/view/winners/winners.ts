import './winners.css';
import createNewElement from '../create-new-element';
import STATE from '../../model/STATE';
import Pagination from '../pagination/pagination';
import Car from '../car/car';

export default class Winners {
    pagination = new Pagination();
    main: HTMLElement | null = document.querySelector('main');


    async drawWinners() {
        const winnersSection = createNewElement<HTMLElement>('section', ['section', 'section_winners', 'hidden']);
        const winnersTitle = this.drawTitle();
        const pagination = this.pagination.drawPagination();
        this.drawWinnersContainer();
        winnersSection.append(winnersTitle);
        winnersSection.append(pagination);
        winnersSection.append(this.drawWinnersContainer());
        return winnersSection;
    }

    async redrawWinners() {
        
    }

    drawTitle() {
        const winnersTitle = createNewElement<HTMLHeadingElement>('h2', ['section__title'], {textContent: `Winners (${STATE.winners.length})`});
        return winnersTitle;
    }

    drawWinnersContainer() {
        const winnersContainer = createNewElement('div', ['winners__container']);
        const allWinners = STATE.winners;

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