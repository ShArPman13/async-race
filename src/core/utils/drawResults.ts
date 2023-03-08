import { getCar } from '../api/getCar';
import { ICar } from '../types/ICar';
import { IWinner } from '../types/IWinner';
import { createElement } from './createElement';

export async function drawResults(winnersTable: IWinner[]) {
  const containerResults = createElement('div', 'winner-td__allRows');
  containerResults.innerHTML = '';

  const winnerCars: ICar[] = await Promise.all(winnersTable.map((winner) => getCar(winner.id)));

  winnersTable.forEach(async (item, i) => {
    const row = createElement('div', 'allRows__row');
    const columnID = createElement('div', 'winners-td__id winners-td__column', `${item.id}`);
    const columnCAR = createElement('i', 'fa-solid fa-truck-monster winners-td__column');
    columnCAR.style.color = `${winnerCars[i].color}`;
    columnCAR.style.fontSize = '2.5rem';
    const columnNAME = createElement('div', 'winners-td__name winners-td__column', `${winnerCars[i].name}`);
    const columnWINS = createElement('div', 'winners-td__wins winners-td__column', `${item.wins}`);
    const columnTIME = createElement('div', 'winners-td__time winners-td__column', `${item.time}`);

    row.append(columnID, columnCAR, columnNAME, columnWINS, columnTIME);
    containerResults.append(row);
  });

  return containerResults;
}
