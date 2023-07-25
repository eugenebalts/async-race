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
    }

    getCars(page: number) {
        return STATE.cars.slice((page - 1) * STATE.carsOnPage, ((page - 1) * STATE.carsOnPage) + STATE.carsOnPage);
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


        return response;
    }

    async deleteCar(id: number) {
        const response = this.model.deleteData(this.path.garage, id);
        await response.then((data) => {
            if (data) {
                for (let i = 0; i < STATE.cars.length; i++) {
                    const car = STATE.cars[i];
                    if (car.id === id) STATE.cars.splice(i, 1);
                    updateMaxPage();
                }
            }
        });
        return response;
    }

    async deleteWinner(id: number) {
        const response = this.model.deleteData(this.path.winners, id);
        await response.then((data) => {
            if (data) {
                for (let i = 0; i < STATE.winners.length; i++) {
                    const winner = STATE.winners[i];
                    if (winner.id === id) STATE.winners.splice(i, 1);
                }
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

    async getWinners() {
        await this.model.getData(this.path.winners)
            .then((data: IWinner[]) => {
                data.forEach(winner => STATE.winners.push(winner));
                updateMaxPage();
            })
            .catch((err) => {
                alert(`Failed to fetch data. Error message:  ${err.message}. Please, reload the page.`);
            });
    }

    async updateWinner(id: number, time: number) {
        const currentValues = STATE.winners.filter((item) => {
            return item.id === id;
        })[0];
        const newValues: IWinner = {
            wins: currentValues.wins + 1,
            time: time < currentValues.time ? time : currentValues.time,
        };

        const response = this.model.postData('PUT', `${this.path.winners}${id}`, newValues);
        return await response.then((data) => {
            const indexInSTATE = STATE.winners.findIndex((item) => item.id === id);
            STATE.winners[indexInSTATE].id = id;
            STATE.winners[indexInSTATE].wins = data.wins;
            STATE.winners[indexInSTATE].time = data.time;
        });
        // return response;
    }

    async createWinner(id: number, time: number) {
        const newWinner: IWinner = {
            id,
            wins: 1,
            time
        };

        if (STATE.winners.some((item) => item.id === id)) {
            return this.updateWinner(id, time);
        }

        const response = this.model.postData('POST', this.path.winners, newWinner);
        await response.then((data) => {
            STATE.winners.push(data);
            updateMaxPage();
        });

        return response;
    }
}

        interface IWinner {
            id?: number,
            wins: number,
            time: number,
        }