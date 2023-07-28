import './view.css';
import Container from './container/container';

export default class View {
    private container = new Container();
    private body: HTMLBodyElement | null = document.querySelector('body');


    async render() {
        const container: HTMLDivElement = await this.container.drawContainer();
        this.body?.append(container);
    }
}