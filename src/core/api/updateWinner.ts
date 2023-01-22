import { BASE_URL } from '../constants/BASE_URL';
import { Endpoints } from '../types/Endpoints';
import { ICarWin } from '../types/ICarWin';

export const updateWinner = async (id: number, body: Omit<ICarWin, 'id'>) => {
  try {
    const response = await fetch(`${BASE_URL}${Endpoints.Winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  } catch (err) {
    return err;
  }
};
