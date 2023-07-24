import { ICar } from "../types/cat.types";

const STATE: ISTATE = {
    cars: [],
    carsOnPage: 7,
    currentPage: 1,
    maxPage: 3,
};

const carNames = ['BWM', 'Mercedes', 'Kia', 'MAZ', 'Lada', 'Ferrari', 'Lamborghini', 'Rocket'];
const carModels = ['330i', 'CLA', 'AMG 6.3', 'Calina', 'Abobus', 'Rio', 'X5', 'e46'];


interface ISTATE {
    carsOnPage: number,
    cars: ICar[],
    currentPage: number,
    maxPage: number,
}

export default STATE;
export {carNames, carModels};