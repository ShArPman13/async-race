import { getCar } from '../api/getCar';
import { ICar } from '../types/ICar';
import { IWinner } from '../types/IWinner';
import { createElement } from './createElement';

export async function drawResults(winnersTable: IWinner[]) {
  const containerResults = createElement('div', 'winner-td__allRows');
  containerResults.innerHTML = '';

  winnersTable.forEach(async (item) => {
    const winnerCar: ICar = await getCar(item.id);
    const row = createElement('div', 'allRows__row');

    const columnID = createElement('div', 'winners-td__id winners-td__column', `${item.id}`);
    const columnCAR = createElement('i', 'fa-solid fa-truck-monster winners-td__column');
    columnCAR.style.color = `${winnerCar.color}`;
    columnCAR.style.fontSize = '2.5rem';
    const columnNAME = createElement('div', 'winners-td__name winners-td__column', `${winnerCar.name}`);
    const columnWINS = createElement('div', 'winners-td__wins winners-td__column', `${item.wins}`);
    const columnTIME = createElement('div', 'winners-td__time winners-td__column', `${item.time}`);

    row.append(columnID, columnCAR, columnNAME, columnWINS, columnTIME);
    containerResults.append(row);
  });

  return containerResults;
}
