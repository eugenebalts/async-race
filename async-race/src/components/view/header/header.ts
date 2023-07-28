import './header.css';
import createNewElement from '../create-new-element';

export default class Header {
    
    drawHeader() {
        const header: HTMLElement = createNewElement('header', ['header']);
        const headerTitle: HTMLHeadElement = createNewElement('h1', ['header__title'], {innerHTML: 'NEED<span>FOR</span><br>ASYNC<br><span>RASING</span>'});
        header.append(headerTitle);

        return header;
    }
}