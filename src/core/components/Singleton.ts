import { observer } from '../App';
import { Garage } from './Garage';

export class Singleton {
  private static instance: Garage;

  public static getInstance(): Garage {
    if (!Singleton.instance) {
      Singleton.instance = new Garage(observer);
    }
    return Singleton.instance;
  }
}
