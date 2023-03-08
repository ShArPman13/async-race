import { deleteCar } from '../api/deleteCar';
import { getCars } from '../api/getCars';
import { ICar } from '../types/ICar';
import { getDriveTime } from '../utils/getDriveTime';
import { animationStopCrash } from '../utils/animationStopCrash';
import { CarMaker } from './CarMaker';
import { CarTuner } from './CarTuner';
import { controllers, driveCar } from '../api/driveCar';
import { IDriveResponse } from '../types/IDriveResponse';
import { stopEngine } from '../api/stopEngine';
import { generateCars } from '../utils/getRandomCarName';
import { addCar } from '../api/addCar';
import { animationStart } from '../utils/animationStart';
import { animationStop } from '../utils/animationStop';
import { ICarFieldObj } from '../types/ICarFieldObj';
import { createWinnerInApi } from '../utils/createWinnerInApi';
import { showWin } from '../utils/showWinRoad';
import { deleteWinner } from '../api/deleteWinner';
import { observerForWinners } from '../App';
import { IObserver } from '../utils/Observable';
import { createElement } from '../utils/createElement';
import { getTotalCars } from '../utils/getTotalCars';

export class Garage {
  container: HTMLElement | null = null;

  public carsContainer: HTMLDivElement = document.createElement('div');

  public addCar: CarMaker;

  private block: CarTuner | null = null;

  public blockHTML: HTMLDivElement | null = null;

  cars: ICar[] = [];

  arrayOfCarFields: ICarFieldObj[] = [];

  isWinner = 0;

  winnersIDS: number[] = [];

  static page = 1;

  paginationHTML: HTMLElement = createElement('div', 'pagination');

  constructor(public observer: IObserver<null>) {
    this.addCar = new CarMaker();
    this.observer = observer;
    this.observe();
  }

  observe() {
    this.observer.subscribe(() => {
      this.pagination();
      this.drawCars();
    });
  }

  getAllTimeBeforeRace() {
    return this.arrayOfCarFields.map(async (car: ICarFieldObj) => {
      const monsterCar = car.car;
      monsterCar.style.transitionDuration = '0s';
      monsterCar.style.rotate = '0deg';
      monsterCar.style.left = '0';
      const timeMS = await getDriveTime(car.id);
      return timeMS;
    });
  }

  async startRaceAllCars(timeMS: number[]) {
    controllers.length = 0;

    this.arrayOfCarFields.map(async (car: ICarFieldObj, i) => {
      const winPoint = car.finish;
      const seconds = Number((timeMS[i] / 1000).toFixed(2));
      animationStart(car.car, car.component, timeMS[i]);
      car.stop.classList.remove('hidden');
      car.play.classList.add('hidden');
      const responseDrive: IDriveResponse = await driveCar(car.id);
      if (!responseDrive.success && responseDrive && !this.addCar.refreshBTN.classList.contains('hidden')) {
        const leftPos = getComputedStyle(car.car);
        animationStopCrash(car.car, leftPos);
      } else {
        this.isWinner += 1;
        if (this.isWinner === 1 && responseDrive.success) {
          await createWinnerInApi(car, timeMS[i]);
          showWin(winPoint, car.carNameText, seconds);
          observerForWinners.update();
        }
      }
    });
  }

  stopRaceAllCars() {
    controllers.forEach((controller) => controller.abort());

    return this.arrayOfCarFields.map(async (car: ICarFieldObj) => {
      const winPoint = car.finish;
      await stopEngine(car.id);
      animationStop(car.car);
      car.stop.classList.add('hidden');
      car.play.classList.remove('hidden');
      this.isWinner = 0;
      winPoint.classList.remove('won');
    });
  }

  loader() {
    const loader = document.createElement('div');
    const topText = document.createElement('span');
    const bottomText = document.createElement('span');
    topText.textContent = 'Server is loading...';
    bottomText.textContent = 'Please wait some time :)';
    loader.className = 'loader';
    loader.append(topText, bottomText);
    return loader;
  }

  async render() {
    if (this.container) {
      return this.container;
    }

    const container = document.createElement('div');
    container.className = 'garage';

    document.body.append(this.loader());

    const wrapper = document.createElement('div');
    wrapper.className = 'garage-wrapper';

    const topContainer = document.createElement('div');
    topContainer.className = 'garage__top-container';
    topContainer.append(await this.addCar.render(), await this.addCar.drawRaceBlock());

    this.addCar.generateBTN.addEventListener('click', async () => {
      const cars = generateCars();
      try {
        await Promise.all(cars.map(async (car) => addCar(car))).catch(Error);
        this.observer.update();
        this.addCar.total.textContent = await getTotalCars();
      } catch (err) {
        /* empty */
      }
    });

    this.addCar.raceBTN.addEventListener('click', async () => {
      this.addCar.raceBTN.classList.add('hidden');
      try {
        const timeMS = await Promise.all(this.getAllTimeBeforeRace());
        await this.startRaceAllCars(timeMS);
      } catch (err) {
        return;
      }
      this.addCar.refreshBTN.classList.remove('hidden');
    });

    this.addCar.refreshBTN.addEventListener('click', () => {
      this.refresh();
    });

    wrapper.append(topContainer);
    wrapper.append(await this.drawCars(), await this.pagination());

    container.append(wrapper);
    document.querySelector('.loader')?.classList.add('hidden');
    this.container = container;

    return container;
  }

  async drawCars() {
    const { res } = await getCars(Garage.page);
    this.cars = await res;

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
      this.block = new CarTuner(car.id, car.name, car.color);
      this.blockHTML = this.block.render();
      document.body.prepend(this.blockHTML);
      this.blockHTML?.classList.remove('hidden');
    });

    const delCar = document.createElement('i');
    delCar.className = 'fa-solid fa-trash';

    delCar.addEventListener('click', async () => {
      await deleteCar(Number(carName.id));
      await deleteWinner(Number(carName.id));

      this.observer.update();
      observerForWinners.update();
      this.addCar.total.textContent = await getTotalCars();

      if (this.cars.length === 0) {
        Garage.page -= 1;
        this.observer.update();
      }
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
      carNameText: car.name,
      car: monsterCar,
      stop,
      play,
      finish,
    });

    road.append(monsterCar, finish);
    topContainer.append(play, stop, carName, wrench, delCar);
    carContainer.append(topContainer, road);

    return carContainer;
  }

  fillArrayOfCarFields(item: ICarFieldObj) {
    this.arrayOfCarFields.push(item);
  }

  async refresh() {
    this.addCar.refreshBTN.classList.add('hidden');
    try {
      await Promise.all(this.stopRaceAllCars());
    } catch (err) {
      return;
    }
    this.addCar.raceBTN.classList.remove('hidden');
  }

  async pagination() {
    const totalPages = Math.ceil(Number(await getTotalCars()) / 7);
    this.paginationHTML.innerHTML = '';

    const left = createElement('i', 'fa-solid fa-square-caret-left');
    const right = createElement('i', 'fa-solid fa-square-caret-right');
    const page = createElement('span', 'pagination__page', `${Garage.page}`);

    if (Garage.page === 1) {
      left.classList.add('hidden');
    } else left.classList.remove('hidden');

    if (Garage.page === totalPages) {
      right.classList.add('hidden');
    } else right.classList.remove('hidden');

    left.addEventListener('click', () => {
      if (Garage.page > 1) {
        Garage.page -= 1;
      }
      if (this.addCar.raceBTN.classList.contains('hidden')) {
        this.refresh();
      }

      this.observer.update();
    });

    right.addEventListener('click', async () => {
      if (Garage.page < totalPages) {
        Garage.page += 1;
      }
      if (this.addCar.raceBTN.classList.contains('hidden')) {
        this.refresh();
      }

      this.observer.update();
    });

    this.paginationHTML.append(left, page, right);
    return this.paginationHTML;
  }
}
