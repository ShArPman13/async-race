import { BASE_URL } from '../constants/BASE_URL';
import { Endpoints } from '../types/Endpoints';

export const driveCar = async (id: number) => {
  const response = await fetch(`${BASE_URL}${Endpoints.Engine}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  return response.status !== 200 ? { success: false } : { ...(await response.json()) };
};
