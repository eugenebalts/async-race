import './container.css';
import { createNewElement } from '../../../utils/utils';
import Main from '../main/main';
import Header from '../header/header';

export default class Container {
    private main = new Main();
    private header = new Header();

    async drawContainer() {
        const container: HTMLDivElement = createNewElement('div', ['container'], {id: 'container'});
        const header: HTMLElement = this.header.drawHeader();
        const main: HTMLElement = await this.main.drawMain();

        container.append(header);
        container.append(main);

        return container;
    }
}