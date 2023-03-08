import { BASE_URL } from '../constants/BASE_URL';
import { Endpoints } from '../types/Endpoints';

export const controllers: AbortController[] = [];

export const driveCar = async (id: number) => {
  const controller = new AbortController();
  const { signal } = controller;
  controllers.push(controller);
  try {
    const response = await fetch(`${BASE_URL}${Endpoints.Engine}?id=${id}&status=drive`, {
      method: 'PATCH',
      signal,
    });
    return response.status !== 200 ? { success: false } : { ...(await response.json()) };
  } catch (err) {
    return err;
  }
};
