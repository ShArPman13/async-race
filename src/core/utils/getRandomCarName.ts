import { CAR_BRANDS } from '../constants/CAR_BRANDS';
import { CAR_MODELS } from '../constants/CAR_MODELS';
import { getRandomColor } from './getRandomColor';
import { getRandomNumberInArray } from './getRandomNumberInArray';

export function generateCars() {
  return new Array(100).fill(0).map(() => ({
    name: `${CAR_BRANDS[getRandomNumberInArray(CAR_BRANDS)]} ${CAR_MODELS[getRandomNumberInArray(CAR_MODELS)]}`,
    color: getRandomColor(),
  }));
}
