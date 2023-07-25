import { ICar } from "../types/cat.types";

const STATE: ISTATE = {
    cars: [],
    carsOnPage: 7,
    currentPage: 1,
    maxPage: 3,
    winners: [],
    winnersPages: 1,
    winnersOnPage: 10,
    currentWinnersPage: 1,
};

function updateMaxPage() {
    STATE.winnersPages = Math.ceil(STATE.winners.length / STATE.winnersOnPage);
    STATE.maxPage = Math.ceil(STATE.cars.length / STATE.carsOnPage);
}

const carNames = ['BWM', 'Mercedes', 'Kia', 'MAZ', 'Lada', 'Ferrari', 'Lamborghini', 'Rocket', 'Ford', 'Honda'];
const carModels = ['330i', 'CLA', 'AMG 6.3', 'Calina', 'Abobus', 'Rio', 'X5', 'e46', 'Accord', 'Corsa'];


interface ISTATE {
    carsOnPage: number,
    cars: ICar[],
    currentPage: number,
    maxPage: number,
    winners: IWinner[],
    winnersPages: number,
    winnersOnPage: number,
    currentWinnersPage: number,
}

interface IWinner {
    id?: number,
    wins: number,
    time: number,
}

export default STATE;
export {carNames, carModels, updateMaxPage};