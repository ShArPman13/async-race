import { addCar } from '../api/addCar';
import { observer } from '../App';

export class CarMaker {
  public container: HTMLDivElement = document.createElement('div');

  public raceBTN = document.createElement('button');

  public generateBTN = document.createElement('button');

  public refreshBTN = document.createElement('button');

  public deleteBTN = document.createElement('button');

  render() {
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
    createBTN.className = 'fa-solid fa-circle-check';

    createBTN.addEventListener('click', async () => {
      await addCar({
        name: inputName.value,
        color: inputColor.value,
      });
      observer.update();
    });

    this.container.append(inputName, inputColor, createBTN);
    return this.container;
  }

  drawRaceBlock() {
    const container = document.createElement('div');
    container.className = 'garage__race-block';

    this.raceBTN.className = 'race-block__race';
    this.raceBTN.textContent = 'RACE';

    this.refreshBTN.className = 'race-block__refresh hidden';
    this.refreshBTN.textContent = 'REFRESH';

    this.generateBTN.className = 'race-block__generate';
    this.generateBTN.textContent = 'GENERATE';

    this.deleteBTN.className = 'race-block__delete';
    this.deleteBTN.textContent = 'DELETE';

    container.append(this.raceBTN, this.refreshBTN, this.generateBTN, this.deleteBTN);
    return container;
  }
}
