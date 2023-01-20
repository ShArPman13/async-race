import { observerForWinners } from '../App';
import { Winners } from './Winners';

export class SingletonWinners {
  private static instance: Winners;

  public static getInstance(): Winners {
    if (!SingletonWinners.instance) {
      SingletonWinners.instance = new Winners(observerForWinners);
    }
    return SingletonWinners.instance;
  }
}
