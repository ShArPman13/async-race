import { BASE_URL } from '../constants/BASE_URL';
import { Endpoints } from '../types/Endpoints';
import { ICar } from '../types/ICar';

export const updateCar = async (id: number, body: Omit<ICar, 'id'>) => {
  await fetch(`${BASE_URL}${Endpoints.Garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
