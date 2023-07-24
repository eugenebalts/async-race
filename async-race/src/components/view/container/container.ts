import './container.css';
import createNewElement from "../create-new-element";
import Main from '../main/main';
import Header from '../header/header';

export default class Container {

    body: HTMLBodyElement | null = document.querySelector('body');
    main = new Main();
    header = new Header();

    async drawContainer() {
        const container: HTMLDivElement = createNewElement('div', ['container'], {id: 'container'});
        const header = this.header.drawHeader();
        const main = await this.main.drawMain();

        container.append(header);
        container.append(main);

        return container;
    }

    // createContainer() {
    //     const container: HTMLDivElement = createNewElement('div', ['container'], {id: 'container'});
    //     this.body?.append(container);
    // }
}