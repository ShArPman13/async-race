// import { getCar } from '../api/getCar';
// import { getWinners } from '../api/getWinners';
// import { ICar } from '../types/ICar';
// import { IWinner } from '../types/IWinner';
import { createElement } from '../utils/createElement';
import { drawResults } from '../utils/drawResults';
import { getWinnersData } from '../utils/getWinnersData';
import { IObserver } from '../utils/Observable';

export class Winners {
  container: HTMLDivElement | null = null;

  wrapper = document.createElement('div');

  constructor(public observer: IObserver<null>) {
    this.observer = observer;
    this.observe();
  }

  observe() {
    this.observer.subscribe(async () => {
      this.renderResults();
    });
  }

  async render() {
    if (this.container) {
      return this.container;
    }

    const container = document.createElement('div');
    container.className = 'winners';
    this.wrapper.className = 'winners-wrapper';

    this.wrapper.append(this.drawTable(), await drawResults(await getWinnersData()));

    container.append(this.wrapper);
    this.container = container;
    return this.container;
  }

  async renderResults() {
    this.wrapper.innerHTML = '';
    this.wrapper.append(this.drawTable(), await drawResults(await getWinnersData()));
  }

  drawTable() {
    const container = createElement('div', 'winners-td caption');

    const columnID = createElement('div', 'winners-td__id winners-td__column', 'ID');
    const columnCAR = createElement('div', 'winners-td__car winners-td__column', 'COLOR');
    const columnNAME = createElement('div', 'winners-td__name winners-td__column', 'NAME');
    const columnWINS = createElement('div', 'winners-td__wins winners-td__column', 'WINS');
    const columnTIME = createElement('div', 'winners-td__time winners-td__column', 'TIME');

    container.append(columnID, columnCAR, columnNAME, columnWINS, columnTIME);
    return container;
  }
}
