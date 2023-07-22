import Model from '../model/model';

export default class Controller {
    model = new Model();
    readonly path = {
        garage: '/garage',
        winners: '/winners'
    };

    async getCars() {
        return this.model.fetchData(this.path.garage);
    }

    getCar() {

    }

    createCar() {

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