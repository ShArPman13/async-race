import { addCar } from '../api/addCar';
import { observer } from '../App';

export class CarMaker {
  container: HTMLDivElement = document.createElement('div');

  render() {
    this.container.innerHTML = '';
    this.container.className = 'garage__car-create';

    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.placeholder = 'Enter car name...';
    const inputColor = document.createElement('input');
    inputColor.className = 'garage__input';
    inputColor.type = 'color';

    const createBTN = document.createElement('i');
    createBTN.className = 'fa-solid fa-square-check';

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
}
