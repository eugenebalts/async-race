import Model from '../model/model';
import STATE from '../model/STATE';
import { ICar } from '../types/cat.types';

export default class Controller {
    model = new Model();
    readonly path = {
        garage: '/garage/',
        winners: '/winners/'
    };

    async getAllCars() {
        await this.model.getData(this.path.garage)
            .then((data: ICar[]) => {
                data.forEach(car => STATE.cars.push(car));
            })
            .catch((err) => {
                alert(`Failed to fetch data. Error message:  ${err.message}. Please, reload the page.`);
            });
        console.log(STATE.cars);
    }

    async getCars(page: number) {
        return STATE.cars.slice((page - 1) * STATE.carsOnPage, ((page - 1) * STATE.carsOnPage) + STATE.carsOnPage);
    }

    getCar() {

    }

    async createCar(name: string, color: string) {
        const newCar: object = {
            name,
            color
        };

        const response = this.model.postData('POST',this.path.garage, newCar);
        await response.then((data) => {
            STATE.cars.push(data);
        });
        console.log(STATE.cars);

        return response;
    }

    deleteCar() {
        
    }

    updateCar() {

    }

    startEngine() {

    }

    stopEngine() {

    }

    driveMode() {

    }

    getWinners() {

    }

    getWinner() {

    }

    createWinner() {

    }

    deleteWinner() {

    }

    updateWinner() {

    }
}

 // const queryParams = [
        //     {
        //         key: '_page',
        //         value: page
        //     },
        //     {
        //         key: '_limit',
        //         value: 5,
        //     }
        // ];
        // queryParams.push();

        // const response = this.model.getData(this.path.garage, queryParams);
        // await response.then((data: ICar[]) => data.forEach((car) => {
        //     STATE.cars.push(car);
        // }));