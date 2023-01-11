import { Garage } from './components/Garage';
import { Header } from './components/Header';

export class App {
  container: HTMLElement = document.body;

  header: Header;

  constructor() {
    this.header = new Header();
  }

  renderPage(idPage: string) {
    const id = idPage;
    document.body.innerHTML = '';
    let page: Garage | null = null;
    if (id === 'winners') {
      // console.log('winners');
    } else {
      page = new Garage();
    }
    if (page) {
      const pageHTML = page.render();
      const containerMain = document.createElement('main');
      containerMain.id = 'root';
      containerMain.append(pageHTML);
      this.container.append(this.header.render(), containerMain);
    }
  }

  router() {
    const loadPage = () => {
      const hash = window.location.hash.slice(1);
      console.log(hash);

      if (hash === 'winners') {
        this.renderPage('winners');
      } else {
        this.renderPage('garage');
      }
    };
    window.addEventListener('hashchange', loadPage);
    window.addEventListener('load', loadPage);
  }

  run() {
    this.router();
  }
}
