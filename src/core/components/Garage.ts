import { deleteCar } from '../api/deleteCar';
import { getCars } from '../api/getCars';
import { ICar } from '../types/ICar';
import { IObserver } from '../utils/Observable';
import { CarMaker } from './CarMaker';
import { CarTuner } from './CarTuner';

interface ICarFieldObj {
  component: HTMLDivElement;
  id: number;
  carName: HTMLDivElement;
  car: HTMLElement;
}

export class Garage {
  carsContainer: HTMLDivElement = document.createElement('div');

  addCar: CarMaker;

  cars: ICar[] = [];

  arrayOfCarFields: ICarFieldObj[] = [];

  constructor(public observer: IObserver<null>) {
    this.addCar = new CarMaker();
    this.observer = observer;
    this.observe();
  }

  observe() {
    this.observer.subscribe(() => {
      this.drawCars();
    });
  }

  async render() {
    const container = document.createElement('div');
    container.className = 'garage';

    const wrapper = document.createElement('div');
    wrapper.className = 'garage-wrapper';

    wrapper.append(this.addCar.render());
    wrapper.append(await this.drawCars());

    container.append(wrapper);
    return container;
  }

  async drawCars() {
    this.cars = await getCars();

    this.carsContainer.innerHTML = '';

    this.carsContainer.className = 'garage__cars-container';

    this.arrayOfCarFields.length = 0;

    this.cars.forEach((car) => {
      this.carsContainer.append(this.drawCar(car));
    });

    return this.carsContainer;
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

    wrench.addEventListener('click', () => {
      const block = new CarTuner(car.id, car.name, car.color);
      document.body.prepend(block.render());
    });

    const delCar = document.createElement('i');
    delCar.className = 'fa-solid fa-trash';

    delCar.addEventListener('click', async () => {
      await deleteCar(Number(carName.id));
      this.observer.update();
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

    this.fillArrayOfCarFields({
      component: carContainer,
      id: car.id,
      carName,
      car: monsterCar,
    });

    road.append(monsterCar, finish);
    topContainer.append(carName, wrench, delCar);
    bottomContainer.append(play, stop);
    carContainer.append(topContainer, bottomContainer, road);

    return carContainer;
  }

  fillArrayOfCarFields(item: ICarFieldObj) {
    this.arrayOfCarFields.push(item);
  }
}
