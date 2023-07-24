import { ICar } from "../types/cat.types";

const STATE: ISTATE = {
    cars: [],
    carsOnPage: 7,
    currentPage: 1,
    maxPage: 3,
};

interface ISTATE {
    carsOnPage: number,
    cars: ICar[],
    currentPage: number,
    maxPage: number,
}

export default STATE;