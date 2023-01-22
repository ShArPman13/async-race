import { getTotalWinners } from '../api/getWinners';
import { SORT_BY } from '../constants/SORT_BY';
import { SortOption } from '../types/SortOption';
import { createElement } from '../utils/createElement';
import { drawResults } from '../utils/drawResults';
import { getWinData } from '../utils/getWinData';
import { IObserver } from '../utils/Observable';

export class Winners {
  container: HTMLDivElement | null = null;

  wrapper = document.createElement('div');

  wrapperResults = document.createElement('div');

  public paginationHTML = createElement('div', 'pagination');

  static page = 1;

  public totalWinners = createElement('span', 'winners__total');

  constructor(public observer: IObserver<null>) {
    this.observer = observer;
    this.observe();
  }

  observe() {
    this.observer.subscribe(async () => {
      this.pagination();
      this.renderResults();
      this.totalWinners.textContent = `Total: ${await getTotalWinners()} winners`;
    });
  }

  async render() {
    if (this.container) {
      return this.container;
    }

    const container = document.createElement('div');
    container.className = 'winners';
    this.wrapper.className = 'winners-wrapper';

    const results = await drawResults(await getWinData(Winners.page));
    this.wrapperResults.className = 'results-wrapper';
    this.wrapperResults.append(results);

    const table = createElement('div', 'winners__table');
    table.append(await this.drawTable(), this.wrapperResults);

    this.wrapper.append(table, await this.pagination());

    this.totalWinners.textContent = `Total: ${await getTotalWinners()} winners`;

    container.append(this.wrapper, this.totalWinners);
    this.container = container;
    return this.container;
  }

  async renderResults() {
    const results = await drawResults(await getWinData(Winners.page));
    this.wrapperResults.innerHTML = '';
    this.wrapperResults.append(results);
  }

  async drawTable() {
    const container = createElement('div', 'winners-td caption');

    const columnID = createElement('div', 'winners-td__id winners-td__column sort asc', 'ID');
    const sortIdUP = createElement('i', 'fa-solid fa-arrow-up-long asc');
    const sortIdDOWN = createElement('i', 'fa-solid fa-arrow-down-long');
    columnID.append(sortIdUP, sortIdDOWN);

    const columnCAR = createElement('div', 'winners-td__car winners-td__column', 'COLOR');
    const columnNAME = createElement('div', 'winners-td__name winners-td__column', 'NAME');

    const columnWINS = createElement('div', 'winners-td__wins winners-td__column sort asc', 'WINS');
    const sortWinUP = createElement('i', 'fa-solid fa-arrow-up-long asc');
    const sortWinDOWN = createElement('i', 'fa-solid fa-arrow-down-long');
    columnWINS.append(sortWinUP, sortWinDOWN);

    const columnTIME = createElement('div', 'winners-td__time winners-td__column sort asc', 'TIME');
    const sortTimeUP = createElement('i', 'fa-solid fa-arrow-up-long asc');
    const sortTimeDOWN = createElement('i', 'fa-solid fa-arrow-down-long');
    columnTIME.append(sortTimeUP, sortTimeDOWN);

    columnTIME.addEventListener('click', () => {
      this.toggleSort(columnTIME, sortTimeUP, sortTimeDOWN, SORT_BY.time);
    });

    columnWINS.addEventListener('click', () => {
      this.toggleSort(columnWINS, sortWinUP, sortWinDOWN, SORT_BY.wins);
    });

    columnID.addEventListener('click', () => {
      this.toggleSort(columnID, sortIdUP, sortIdDOWN, SORT_BY.id);
    });

    container.append(columnID, columnCAR, columnNAME, columnWINS, columnTIME);
    return container;
  }

  async listener(sortOption: string) {
    const results = await drawResults(await getWinData(Winners.page, sortOption));
    this.wrapperResults.innerHTML = '';
    this.wrapperResults.append(results);
  }

  toggleSort(elem: HTMLElement, up: HTMLElement, down: HTMLElement, sortOption: string) {
    let sortingASC: SortOption;
    let sortingDESC: SortOption;

    switch (sortOption) {
      case 'time':
        sortingASC = SortOption.TimeASC;
        sortingDESC = SortOption.TimeDESC;
        break;
      case 'wins':
        sortingASC = SortOption.WinASC;
        sortingDESC = SortOption.WinDESC;
        break;
      default:
        sortingASC = SortOption.IdASC;
        sortingDESC = SortOption.IdDESC;
        break;
    }

    elem.classList.toggle('asc');
    if (elem.classList.contains('asc')) {
      up.classList.add('asc');
      down.classList.remove('desc');
      this.listener(sortingDESC);
    } else {
      up.classList.remove('asc');
      down.classList.add('desc');
      this.listener(sortingASC);
    }
  }

  async pagination() {
    const totalPages = Math.ceil(Number(await getTotalWinners()) / 10);
    this.paginationHTML.innerHTML = '';

    const left = createElement('i', 'fa-solid fa-square-caret-left');
    const right = createElement('i', 'fa-solid fa-square-caret-right');
    const page = createElement('span', 'pagination__page', `${Winners.page}`);

    if (Winners.page === 1) {
      left.classList.add('hidden');
    } else left.classList.remove('hidden');

    if (Winners.page === totalPages) {
      right.classList.add('hidden');
    } else right.classList.remove('hidden');

    left.addEventListener('click', () => {
      if (Winners.page > 1) {
        Winners.page -= 1;
      }
      this.observer.update();
    });

    right.addEventListener('click', async () => {
      if (Winners.page < totalPages) {
        Winners.page += 1;
      }

      this.observer.update();
    });

    this.paginationHTML.append(left, page, right);
    return this.paginationHTML;
  }
}
