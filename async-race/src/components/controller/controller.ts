import Model from '../model/model';
import STATE, { updateMaxPage } from '../model/STATE';
import { ICar } from '../types/cat.types';

export default class Controller {
    model = new Model();
    readonly path = {
        garage: '/garage/',
        winners: '/winners/',
        engine: '/engine/',
    };

    async getAllCars() {
        await this.model.getData(this.path.garage)
            .then((data: ICar[]) => {
                data.forEach(car => STATE.cars.push(car));
                updateMaxPage();
            })
            .catch((err) => {
                alert(`Failed to fetch data. Error message:  ${err.message}. Please, reload the page.`);
            });
        console.log(STATE.cars);
    }

    getCars(page: number) {
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
            updateMaxPage();
        });
        console.log(STATE.cars);

        return response;
    }

    async deleteCar(id: number) {
        const response = this.model.deleteData(this.path.garage, id);
        await response.then((data) => {
            if (data) {
                console.log(id);
                for (let i = 0; i < STATE.cars.length; i++) {
                    const car = STATE.cars[i];
                    if (car.id === id) STATE.cars.splice(i, 1);
                    updateMaxPage();
                }
                console.log(STATE.cars);
            }
        });
        return response;
        
    }

    async updateCar(name: string, color: string, id: number) {
        const updatedCar = {
            name,
            color
        };

        const response = this.model.postData('PUT',`${this.path.garage}${id}`, updatedCar);
        await response.then(() => {
            for (let i = 0; i < STATE.cars.length; i++) {
                const car = STATE.cars[i];
                if (car.id === id) {
                    car.name = updatedCar.name;
                    car.color = updatedCar.color;
                }
            }
        });
        console.log(STATE.cars);

        return response;
    }

    async startEngine(id: number, method: string) {
        const queryParams = [
            {
                key: 'id',
                value: id,
            },
            {
                key: 'status',
                value: method
            }
        ];
        const response = this.model.patchData(`${this.path.engine}`, queryParams);
        return await response
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    stopEngine() {

    }

    async driveMode(id: number) {
        const queryParams = [
            {
                key: 'id',
                value: id,
            },
            {
                key: 'status',
                value: 'drive'
            }
        ];
        // const response = this.model.patchData(`${this.path.engine}`, queryParams);
        try {
            const response = await this.model.patchData(`${this.path.engine}`, queryParams);
            const data = response;
            return data;

        } catch {
            throw new Error('Brother, your 0.9 TDI has broken, swap to 6.3');
        }
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