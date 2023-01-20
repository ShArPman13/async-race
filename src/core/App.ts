import { Garage } from './components/Garage';
import { Header } from './components/Header';
import { SingletonGarage } from './components/SingletonGarage';
import { SingletonWinners } from './components/SingletonWinners';
import { Winners } from './components/Winners';
import { Observable } from './utils/Observable';

export const observer = Observable<null>();
export const observerForWinners = Observable<null>();

export class App {
  container: HTMLElement = document.body;

  header: Header;

  constructor() {
    this.header = new Header();
  }

  async renderPage(idPage: string) {
    const id = idPage;

    document.body.innerHTML = '';
    let page: Garage | Winners | null = null;

    if (id === 'winners') {
      page = SingletonWinners.getInstance();
    } else {
      page = SingletonGarage.getInstance();
    }
    if (page) {
      const pageHTML = await page.render();
      const containerMain = document.createElement('main');
      containerMain.id = 'root';

      const wrapper = document.createElement('div');
      wrapper.className = 'main-wrapper';
      wrapper.append(pageHTML);

      containerMain.append(wrapper);
      this.container.append(this.header.render(), containerMain);
    }
  }

  router() {
    const loadPage = () => {
      const hash = window.location.hash.slice(2);

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
