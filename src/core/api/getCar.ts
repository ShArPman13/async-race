import { BASE_URL } from '../constants/BASE_URL';
import { Endpoints } from '../types/Endpoints';

export const getCar = async (id: number) => {
  const response = await fetch(`${BASE_URL}${Endpoints.Garage}/${id}`);
  return response.json();
};
