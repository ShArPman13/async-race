import { BASE_URL } from '../constants/BASE_URL';
import { Endpoints } from '../types/Endpoints';

export const getWinners = async (sort: string, pageNum: number, limitPerPage = 10) => {
  try {
    const response = await fetch(`${BASE_URL}${Endpoints.Winners}?_page=${pageNum}&_limit=${limitPerPage}&${sort}`);
    const res = await response.json();
    return res;
  } catch (err) {
    return err;
  }
};

export const getTotalWinners = async (): Promise<string | null> => {
  try {
    const response = await fetch(`${BASE_URL}${Endpoints.Winners}?_limit=10`);
    const total = response.headers.get('X-Total-Count');
    return total;
  } catch (err) {
    return err as string;
  }
};
