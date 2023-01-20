import { BASE_URL } from '../constants/BASE_URL';
import { Endpoints } from '../types/Endpoints';

export const deleteWinner = async (id: number) => fetch(`${BASE_URL}${Endpoints.Winners}/${id}`, { method: 'DELETE' });
