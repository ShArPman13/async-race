import { BASE_URL } from '../constants/BASE_URL';
import { Endpoints } from '../types/Endpoints';
import { ICarWin } from '../types/ICarWin';

export const createWinner = async (body: ICarWin) => {
  try {
    const response = await fetch(`${BASE_URL}${Endpoints.Winners}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};
