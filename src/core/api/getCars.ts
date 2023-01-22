import { BASE_URL } from '../constants/BASE_URL';
import { Endpoints } from '../types/Endpoints';

export const getCars = async (pageNum: number, limitPerPage = 7) => {
  const page = pageNum;
  const limit = limitPerPage;
  const response = await fetch(`${BASE_URL}${Endpoints.Garage}?_page=${page}&_limit=${limit}`);

  const res = response.json();
  const total = response.headers.get('X-Total-Count');
  return { res, total };
};
