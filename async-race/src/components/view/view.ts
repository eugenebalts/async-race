import './view.css';
import Container from './container/container';
import Header from './header/header';
import Main from './main/main';

export default class View {
    container = new Container();
    header = new Header();
    main = new Main();


    render() {
        this.container.createContainer();
        this.header.drawHeader();
        this.main.drawMain();
    }
}