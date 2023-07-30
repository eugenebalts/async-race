interface ICar {
    name: string;
    color: string;
    id: number;
}

interface IState {
    carsOnPage: number,
    cars: ICar[],
    currentPage: number,
    maxPage: number,
    winners: IWinner[],
    winnersPages: number,
    winnersOnPage: number,
    currentWinnersPage: number,
    firstWinner: HTMLElement | null,
}

interface IWinner {
    id?: number,
    wins: number,
    time: number,
}

interface IOptions {
    [key: string]: string | boolean;    
}

interface IQueryParams {
    key: string;
    value: number | string;
}



export {ICar, IState, IWinner, IOptions, IQueryParams};