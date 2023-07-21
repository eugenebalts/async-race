import './container.css';
import createNewElement from "../create-new-element";

export default class Container {

    body: HTMLBodyElement | null = document.querySelector('body');

    createContainer() {
        const container: HTMLDivElement = createNewElement('div', ['container'], {id: 'container'});
        this.body?.append(container);
    }
}