import { addCar } from '../api/addCar';

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

    const createBTN = document.createElement('button');
    createBTN.className = 'carmaker-btn btn';
    createBTN.innerText = '+';

    createBTN.addEventListener('click', async () => {
      await addCar({
        name: inputName.value,
        color: inputColor.value,
      });
    });

    this.container.append(inputName, inputColor, createBTN);
    return this.container;
  }
}
