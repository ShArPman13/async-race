import { BASE_URL } from '../constants/BASE_URL';
import { Endpoints } from '../types/Endpoints';

export const getCars = async () => {
  const response = await fetch(`${BASE_URL}${Endpoints.Garage}`);

  return response.json();
};
