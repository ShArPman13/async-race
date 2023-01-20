import { BASE_URL } from '../constants/BASE_URL';
import { Endpoints } from '../types/Endpoints';

export const getWinner = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}${Endpoints.Winners}/${id}`);
    return response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};
