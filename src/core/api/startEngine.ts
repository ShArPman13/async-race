import { BASE_URL } from '../constants/BASE_URL';
import { Endpoints } from '../types/Endpoints';

export const startEngine = async (id: number) => {
  const response = await fetch(`${BASE_URL}${Endpoints.Engine}?id=${id}&status=started`, { method: 'PATCH' });
  return response.json();
};
