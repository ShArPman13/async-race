import { getCars } from '../api/getCars';
import { Garage } from '../components/Garage';

export async function getTotalCars() {
  const { total } = await getCars(Garage.page);
  return total;
}
