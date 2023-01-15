import { deleteCar } from '../api/deleteCar';
import { getCars } from '../api/getCars';
import { ICar } from '../types/ICar';
import { getDriveTime } from '../utils/getDriveTime';
import { animationStopCrash } from '../utils/animationStopCrash';
import { IObserver } from '../utils/Observable';
import { CarMaker } from './CarMaker';
import { CarTuner } from './CarTuner';
import { driveCar } from '../api/driveCar';
import { IDriveResponse } from '../types/IDriveResponse';
import { stopEngine } from '../api/stopEngine';
import { generateCars } from '../utils/getRandomCarName';
import { addCar } from '../api/addCar';
import { animationStart } from '../utils/animationStart';
import { animationStop } from '../utils/animationStop';

interface ICarFieldObj {
  component: HTMLDivElement;
  id: number;
  carName: HTMLDivElement;
  car: HTMLElement;
  stop: HTMLElement;
  play: HTMLElement;
}

export class Garage {
  container: HTMLDivElement | null = null;

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
    if (this.container) {
      return this.container;
    }
    const container = document.createElement('div');
    container.className = 'garage';

    const wrapper = document.createElement('div');
    wrapper.className = 'garage-wrapper';

    const topContainer = document.createElement('div');
    topContainer.className = 'garage__top-container';
    topContainer.append(this.addCar.render(), this.addCar.drawRaceBlock());

    this.addCar.generateBTN.addEventListener('click', async () => {
      const cars = generateCars();
      await Promise.all(cars.map(async (car) => addCar(car)));
      this.observer.update();
    });

    this.addCar.deleteBTN.addEventListener('click', async () => {
      const cars = await getCars();
      await Promise.all(cars.map(async (car: ICar) => deleteCar(car.id)));
      this.observer.update();
    });

    this.addCar.raceBTN.addEventListener('click', async () => {
      await Promise.all(
        this.arrayOfCarFields.map(async (car: ICarFieldObj) => {
          const monsterCar = car.car;
          monsterCar.style.left = '0';
          const timeMS = await getDriveTime(car.id);

          return timeMS;
          // eslint-disable-next-line comma-dangle
        })
      ).then((timeMS) => {
        this.arrayOfCarFields.map(async (car: ICarFieldObj, i) => {
          animationStart(car.car, car.component, timeMS[i]);
          car.stop.classList.remove('hidden');
          car.play.classList.add('hidden');
          const responseDrive: IDriveResponse = await driveCar(car.id);
          if (!responseDrive.success) {
            const leftPos = getComputedStyle(car.car);
            animationStopCrash(car.car, leftPos);
          }
        });
      });
    });

    this.addCar.refreshBTN.addEventListener('click', async () => {
      await Promise.all(
        this.arrayOfCarFields.map(async (car: ICarFieldObj) => {
          await stopEngine(car.id);
          animationStop(car.car);
          car.stop.classList.add('hidden');
          car.play.classList.remove('hidden');
          // eslint-disable-next-line prettier/prettier
        }),
      );
    });
    wrapper.append(topContainer);
    wrapper.append(await this.drawCars());

    container.append(wrapper);
    this.container = container;

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

    const monsterCar = document.createElement('i');
    monsterCar.className = 'fa-solid fa-truck-monster';
    monsterCar.style.color = car.color;

    const finish = document.createElement('i');
    finish.className = 'material-symbols-outlined';
    finish.textContent = 'sports_score';

    const stop = document.createElement('i');
    stop.className = 'fa-solid fa-circle-stop hidden';

    const play = document.createElement('i');
    play.className = 'fa-solid fa-circle-play';

    async function startRace() {
      monsterCar.style.rotate = '0deg';
      monsterCar.style.left = '0';
      const timeMS = await getDriveTime(car.id);
      animationStart(monsterCar, carContainer, timeMS);
      stop.classList.remove('hidden');
      play.classList.add('hidden');
      const responseDrive: IDriveResponse = await driveCar(car.id);
      if (!responseDrive.success) {
        const leftPos = getComputedStyle(monsterCar);
        animationStopCrash(monsterCar, leftPos);
      }
    }

    async function stopRace() {
      await stopEngine(car.id);
      animationStop(monsterCar);
      stop.classList.add('hidden');
      play.classList.remove('hidden');
    }

    play.addEventListener('click', startRace);

    stop.addEventListener('click', stopRace);

    const road = document.createElement('div');
    road.className = 'cars-container__road';

    this.fillArrayOfCarFields({
      component: carContainer,
      id: car.id,
      carName,
      car: monsterCar,
      stop,
      play,
    });

    road.append(monsterCar, finish);
    topContainer.append(play, stop, carName, wrench, delCar);
    carContainer.append(topContainer, road);

    return carContainer;
  }

  fillArrayOfCarFields(item: ICarFieldObj) {
    this.arrayOfCarFields.push(item);
  }
}
