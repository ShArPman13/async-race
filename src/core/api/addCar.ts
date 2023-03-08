import { BASE_URL } from '../constants/BASE_URL';
import { Endpoints } from '../types/Endpoints';
import { ICar } from '../types/ICar';

export const addCar = async (body: Omit<ICar, 'id'>) => {
  await fetch(`${BASE_URL}${Endpoints.Garage}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
