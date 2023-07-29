import {IState } from "../types/types";

const STATE: IState = {
    cars: [],
    carsOnPage: 7,
    currentPage: 1,
    maxPage: 3,
    winners: [],
    winnersPages: 1,
    winnersOnPage: 3,
    currentWinnersPage: 1,
    firstWinner: null,
};

function updateMaxPage() {
    STATE.winnersPages = Math.ceil(STATE.winners.length / STATE.winnersOnPage);
    STATE.maxPage = Math.ceil(STATE.cars.length / STATE.carsOnPage);
}

const CARS_NAMES = ['BWM', 'Mercedes', 'Kia', 'MAZ', 'Lada', 'Ferrari', 'Lamborghini', 'Rocket', 'Ford', 'Honda'];
const CARS_MODELS = ['330i', 'CLA', 'AMG 6.3', 'Calina', 'Abobus', 'Rio', 'X5', 'e46', 'Accord', 'Corsa'];

export default STATE;
export {CARS_NAMES, CARS_MODELS, updateMaxPage};