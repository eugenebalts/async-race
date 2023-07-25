import { ICar } from "../types/cat.types";

const STATE: ISTATE = {
    cars: [],
    carsOnPage: 7,
    currentPage: 1,
    maxPage: 3,
    winners: [],
};

function updateMaxPage() {
    STATE.maxPage = Math.ceil(STATE.cars.length / STATE.carsOnPage);
    console.log(STATE.maxPage);
}

const carNames = ['BWM', 'Mercedes', 'Kia', 'MAZ', 'Lada', 'Ferrari', 'Lamborghini', 'Rocket', 'Ford', 'Honda'];
const carModels = ['330i', 'CLA', 'AMG 6.3', 'Calina', 'Abobus', 'Rio', 'X5', 'e46', 'Accord', 'Corsa'];


interface ISTATE {
    carsOnPage: number,
    cars: ICar[],
    currentPage: number,
    maxPage: number,
    winners: IWinner[],
}

interface IWinner {
    id?: number,
    wins: number,
    time: number,
}

export default STATE;
export {carNames, carModels, updateMaxPage};