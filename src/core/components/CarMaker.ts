import { addCar } from '../api/addCar';
import { observer } from '../App';
import { createElement } from '../utils/createElement';
import { getTotalCars } from '../utils/getTotalCars';

export class CarMaker {
  public container: HTMLDivElement = document.createElement('div');

  public raceBTN = document.createElement('i');

  public generateBTN = document.createElement('i');

  public refreshBTN = document.createElement('i');

  public total = document.createElement('span');

  async render() {
    this.container.innerHTML = '';
    this.container.className = 'garage__car-create';

    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.placeholder = 'Enter car name...';
    inputName.value = 'car';

    const inputColor = document.createElement('input');
    inputColor.className = 'garage__input';
    inputColor.type = 'color';
    inputColor.value = '#19B9E1';

    const createBTN = document.createElement('i');
    createBTN.className = 'fa-solid fa-right-to-bracket';

    createBTN.addEventListener('click', async () => {
      await addCar({
        name: inputName.value,
        color: inputColor.value,
      });
      observer.update();
      this.total.textContent = await getTotalCars();
    });

    this.container.append(inputName, inputColor, createBTN);
    return this.container;
  }

  async drawRaceBlock() {
    const container = document.createElement('div');
    container.className = 'garage__race-block';

    const leftBlock = createElement('div', 'race-block__left');
    const rightBlock = createElement('div', 'race-block__right');

    this.raceBTN.className = 'fa-solid fa-flag-checkered';
    this.refreshBTN.className = 'fa-solid fa-rotate-right hidden';
    leftBlock.append(this.raceBTN, this.refreshBTN);

    const totalContainer = createElement('div', 'total-container');
    const totalText = createElement('span', 'right__text', 'Total cars');
    this.total.className = 'race-block__total';
    this.total.textContent = await getTotalCars();
    totalContainer.append(totalText, this.total);
    this.generateBTN.className = 'fa-solid fa-square-plus';
    rightBlock.append(totalContainer, this.generateBTN);

    container.append(leftBlock, rightBlock);
    return container;
  }
}
