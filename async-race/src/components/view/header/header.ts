import './header.css';
import createNewElement from "../create-new-element";

export default class Header {
    body: HTMLBodyElement | null = document.querySelector('body');
    container: HTMLElement | null = document.querySelector('.container');

    public async drawHeader() {
        this.container = document.querySelector('.container');
        const header: HTMLHeadingElement = createNewElement('header', ['header']);
        const headerTitle: HTMLHeadElement = createNewElement('h1', ['header__title'], {innerHTML: 'NEED<span>FOR</span><br>ASYNC<br><span>RASING</span>'});
        header.append(headerTitle);
        this.container?.append(header);
    }
}