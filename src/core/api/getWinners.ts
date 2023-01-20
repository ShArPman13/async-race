import { BASE_URL } from '../constants/BASE_URL';
import { Endpoints } from '../types/Endpoints';

export const getWinners = async (sort: string) => {
  try {
    const response = await fetch(`${BASE_URL}${Endpoints.Winners}${sort}`);
    return response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};
