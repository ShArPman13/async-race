import { updateCar } from '../api/updateCar';
import { observer } from '../App';

export class CarTuner {
  container: HTMLDivElement = document.createElement('div');

  constructor(public id: number, public name: string, public color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }

  render() {
    this.container.innerHTML = '';

    const dark = document.createElement('div');
    dark.className = 'dark';

    dark.addEventListener('mousedown', (e: MouseEvent) => {
      const target = <HTMLElement>e.target;
      if (!target.closest('.garage__car-tune')) {
        dark.classList.add('hidden');
      }
    });

    this.container.className = 'garage__car-tune';

    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.placeholder = 'Enter new name...';
    inputName.value = this.name;

    const inputColor = document.createElement('input');
    inputColor.className = 'garage__input';
    inputColor.type = 'color';
    inputColor.value = this.color;

    const changeBTN = document.createElement('i');
    changeBTN.className = 'fa-solid fa-circle-check change';

    changeBTN.addEventListener('click', async () => {
      await updateCar(this.id, {
        name: inputName.value,
        color: inputColor.value,
      });
      observer.update();
      dark.classList.add('hidden');
    });

    this.container.append(inputName, inputColor, changeBTN);
    dark.append(this.container);
    return dark;
  }
}
