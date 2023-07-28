import './update-car.css';
import Car from '../car/car';
import createNewElement from '../create-new-element';
import STATE from '../../model/STATE';
import Controller from '../../controller/controller';


export default class UpdateCar {
    updated = false;
    controller  = new Controller();
    constructor() {

    }

    drawUpdateWrapper(id: number) {

        const updateWrapper = createNewElement('div', ['garage__update-car']);

        const updateContainer = createNewElement('div', ['update-car__container']);

        const carToChangeWrapper = createNewElement('div', ['update-car__car-to-change']);
        let carsName = 'null';
        let carsIndex = -1;
        let carColor = '#ffffff';
        const carToChangeImg = getCarModel();

        function getCarModel(newColor?: string) {
            let color = 'null';
            let name = 'null';
            for (let i = 0; i < STATE.cars.length; i++) {
                const car = STATE.cars[i];
                if (car.id === id) {
                    color = newColor ? newColor : car.color;
                    carColor = car.color;
                    name = car.name;
                    carsName = car.name;
                    carsIndex = i;
                }
            }
            return new Car(name, color, id).createCar();
        }

        const carToChangeName = createNewElement('h3', ['track__title'], {textContent: `${carsName} №${id}`});
        // const carToChangeImg = new Car(carsModel.name, carsModel.color, carsModel.id).createCar();

        const inputsWrapper = createNewElement('div', ['form__inputs_update']);    
        const newCarInput: HTMLInputElement = createNewElement<HTMLInputElement>('input', ['form__input',
            'form__input_update', 'form__input_text'], {value: carsName, placeholder: 'Cars name'});
        const newCarColor: HTMLInputElement = createNewElement<HTMLInputElement>('input', ['form__input',
            'form__input_update', 'form__input_color'], {type: 'color'});
        newCarColor.value = carColor;
        const newCarButton = createNewElement('button', ['form__button', 'form__button_update'], {textContent: 'UPDATE'});

        newCarInput.addEventListener('input', () => {
            const value = newCarInput.value;
            carToChangeName.textContent = `${
                value.length > 10 ? value.slice(0, 10) + '... ' : value} №${id}`;
        });

        newCarColor.addEventListener('input', () => {
            if (carToChangeWrapper.children[1]) {
                carToChangeWrapper.removeChild(carToChangeWrapper.children[1]);
                carToChangeWrapper.append(getCarModel(newCarColor.value));
            }
        });

        newCarButton.addEventListener('click', () => {
            // const car = STATE.cars[carsIndex];

            STATE.cars[carsIndex].color = newCarColor.value;
            STATE.cars[carsIndex].name = newCarInput.value;


            this.controller.updateCar(newCarInput.value, newCarColor.value, id);
            this.updated = true;
        });

        const closeButton = createNewElement('div', ['update-car__close-btn']);

        closeButton.addEventListener('click', () => {
            this.updated = true;
        });

        inputsWrapper.append(newCarInput);
        inputsWrapper.append(newCarColor);
        inputsWrapper.append(newCarButton);
        carToChangeWrapper.append(carToChangeName);
        carToChangeWrapper.append(carToChangeImg);
        updateContainer.append(closeButton);
        updateContainer.append(carToChangeWrapper);
        updateContainer.append(inputsWrapper);
        updateWrapper.append(updateContainer);
        return updateWrapper;
    }
}