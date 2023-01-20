import { observer } from '../App';
import { Garage } from './Garage';

export class SingletonGarage {
  private static instance: Garage;

  public static getInstance(): Garage {
    if (!SingletonGarage.instance) {
      SingletonGarage.instance = new Garage(observer);
    }
    return SingletonGarage.instance;
  }
}
