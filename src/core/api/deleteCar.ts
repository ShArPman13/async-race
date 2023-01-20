import { BASE_URL } from '../constants/BASE_URL';
import { Endpoints } from '../types/Endpoints';

export const deleteCar = async (id: number) => fetch(`${BASE_URL}${Endpoints.Garage}/${id}`, { method: 'DELETE' });
