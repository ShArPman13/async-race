import { deleteCar } from '../api/deleteCar';
import { getCars } from '../api/getCars';
import { ICar } from '../types/ICar';
import { CarMaker } from './CarMaker';

export class Garage {
  container: HTMLDivElement = document.createElement('div');

  addCar: CarMaker;

  cars: ICar[] = [];

  constructor() {
    this.addCar = new CarMaker();
  }

  async render() {
    this.container.innerHTML = '';
    this.container.className = 'garage';

    const wrapper = document.createElement('div');
    wrapper.className = 'garage-wrapper';

    wrapper.append(this.addCar.render());

    this.cars = await getCars();

    wrapper.append(this.drawCars(this.cars));

    this.container.append(wrapper);

    return this.container;
  }

  drawCars(cars: ICar[]) {
    const carsContainer = document.createElement('div');
    carsContainer.className = 'garage__cars-container';

    cars.forEach((car) => {
      carsContainer.append(this.drawCar(car));
    });

    return carsContainer;
  }

  drawCar(car: ICar) {
    const carContainer = document.createElement('div');
    carContainer.className = 'cars-container__item';

    const topContainer = document.createElement('div');
    topContainer.className = 'cars-container__top';

    const bottomContainer = document.createElement('div');
    bottomContainer.className = 'cars-container__bottom';

    const carName = document.createElement('div');
    carName.className = 'cars-container__name';
    carName.innerText = car.name;
    carName.id = `${car.id}`;

    const wrench = document.createElement('i');
    wrench.className = 'fa-solid fa-wrench';

    const delCar = document.createElement('i');
    delCar.className = 'fa-solid fa-trash';

    delCar.addEventListener('click', async () => {
      await deleteCar(Number(carName.id));
      this.render();
    });

    const play = document.createElement('i');
    play.className = 'fa-solid fa-circle-play';

    const stop = document.createElement('i');
    stop.className = 'fa-solid fa-circle-stop';

    const road = document.createElement('div');
    road.className = 'cars-container__road';

    const monsterCar = document.createElement('i');
    monsterCar.className = 'fa-solid fa-truck-monster';
    monsterCar.style.color = car.color;

    const finish = document.createElement('i');
    finish.className = 'material-symbols-outlined';
    finish.textContent = 'sports_score';

    road.append(monsterCar, finish);
    topContainer.append(carName, wrench, delCar);
    bottomContainer.append(play, stop);
    carContainer.append(topContainer, bottomContainer, road);

    return carContainer;
  }
}
