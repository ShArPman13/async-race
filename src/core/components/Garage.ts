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

  render() {
    this.container.className = 'garage';

    const wrapper = document.createElement('div');
    wrapper.className = 'garage-wrapper';

    wrapper.append(this.addCar.render());

    getCars()
      .then((data) => {
        this.cars = [...data];
      })
      .then(() => {
        wrapper.append(this.drawCars(this.cars));
      });

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
    carContainer.innerText = car.name;

    return carContainer;
  }
}
