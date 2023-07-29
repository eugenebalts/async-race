import './update-car.css';
import Car from '../car/car';
import createNewElement from '../create-new-element';
import STATE from '../../model/STATE';
import Controller from '../../controller/controller';


export default class UpdateCar {
    updated = false;
    private controller  = new Controller();
    private carIndex: number = -1;
    private carColor: string = '#ffffff';
    private carName: string = 'null';
    private carToChangeName: HTMLHeadingElement | null = null;
    private carToChangeWrapper: HTMLDivElement | null = null;

    drawUpdateWrapper(id: number) {
        const updateWrapper: HTMLDivElement = createNewElement('div', ['garage__update-car']);
        const updateContainer: HTMLDivElement = createNewElement('div', ['update-car__container']);
        const carToChangeWrapper: HTMLDivElement = createNewElement('div', ['update-car__car-to-change']);
        this.carToChangeWrapper = carToChangeWrapper;
        const carToChangeImg: HTMLDivElement = this.getCarModel(id);

        const carToChangeName: HTMLHeadingElement = this.drawCarTitle(this.carName, id);
        this.carToChangeName = carToChangeName;
        const carEditorWrapper: HTMLDivElement = this.drawInputsWrapper(this.carName, this.carColor , id);
        const closeButton = this.drawCloseButton();

        carToChangeWrapper.append(carToChangeName);
        carToChangeWrapper.append(carToChangeImg);
        updateContainer.append(closeButton);
        updateContainer.append(carToChangeWrapper);
        updateContainer.append(carEditorWrapper);
        updateWrapper.append(updateContainer);

        return updateWrapper;
    }

    private drawCarTitle(carsName: string, id: number) {
        const carToChangeName: HTMLHeadingElement = createNewElement('h3', ['track__title'], {textContent: `${carsName} №${id}`});

        return carToChangeName;
    }

    private drawInputsWrapper(carsName: string, carColor: string, id: number) {
        const carEditorWrapper: HTMLDivElement = createNewElement('div', ['form__inputs_update']);
        const carEditorName: HTMLInputElement = this.drawCarEditorName(carsName, id);
        const carEditorColor: HTMLInputElement = this.drawCarEditorColor(carColor, id);
        const carEditorButton: HTMLButtonElement = this.drawCarEditorButton();

        carEditorWrapper.append(carEditorName);
        carEditorWrapper.append(carEditorColor);
        carEditorWrapper.append(carEditorButton);

        carEditorButton.addEventListener('click', () => {
            if (carEditorName.value) {
                STATE.cars[this.carIndex].color = carEditorColor.value;
                STATE.cars[this.carIndex].name = carEditorName.value;
                this.controller.updateCar(carEditorName.value, carEditorColor.value, id);
                this.updated = true;
            } else {
                alert('Please, name a car!');
            }
        });

        return carEditorWrapper;
    }

    private drawCarEditorName(carsName: string, id: number) {
        const carToChangeName = this.carToChangeName;
        const newCarInput: HTMLInputElement = createNewElement<HTMLInputElement>('input', ['form__input',
            'form__input_update', 'form__input_text'], {value: carsName, placeholder: 'Cars name'});

        newCarInput.addEventListener('input', () => {
            const value: string = newCarInput.value;
            if (carToChangeName) {
                carToChangeName.textContent = `${
                    value.length > 10 ? value.slice(0, 10) + '... ' : value} №${id}`;
            }
        });

        return newCarInput;
    }

    private drawCarEditorColor(carColor: string, id: number) {
        const carToChangeWrapper = this.carToChangeWrapper;
        const newCarColor: HTMLInputElement = createNewElement<HTMLInputElement>('input', ['form__input',
            'form__input_update', 'form__input_color'], {type: 'color'});
        newCarColor.value = carColor;

        newCarColor.addEventListener('input', () => {
            if (carToChangeWrapper) {
                if (carToChangeWrapper.children[1]) {
                    carToChangeWrapper.removeChild(carToChangeWrapper.children[1]);
                    carToChangeWrapper.append(this.getCarModel(id, newCarColor.value));
                }
            }
        });

        return newCarColor;
    }

    private drawCarEditorButton() {
        const newCarButton: HTMLButtonElement = createNewElement('button',
            ['form__button', 'form__button_update'], {textContent: 'UPDATE'});

        return newCarButton;
    }

    private drawCloseButton() {
        const closeButton = createNewElement('div', ['update-car__close-btn']);

        closeButton.addEventListener('click', () => {
            this.updated = true;
        });

        return closeButton;
    }

    private getCarModel(id: number, newColor? : string) {
        let color: string = 'null';
            let name: string = 'null';

            for (let i = 0; i < STATE.cars.length; i++) {
                const car = STATE.cars[i];
                if (car.id === id) {
                    color = newColor ? newColor : car.color;
                    this.carColor = car.color;
                    name = car.name;
                    this.carName = car.name;
                    this.carIndex = i;
                }
            }

            return new Car(name, color, id).createCar();
    }

}