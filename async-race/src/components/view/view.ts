import './view.css';
import Container from './container/container';
import Header from './header/header';
import Main from './main/main';

export default class View {
    container = new Container();
    header = new Header();
    main = new Main();
    body = document.querySelector('body');


    async render() {
        const container = await this.container.drawContainer();
        this.body?.append(container);
    }
}