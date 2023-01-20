import { getWinners } from '../api/getWinners';
import { IWinner } from '../types/IWinner';
import { SortOption } from '../types/SortOption';

export async function getWinData(sort: string = SortOption.IdASC) {
  const winnersTable: IWinner[] = await getWinners(sort);
  return winnersTable;
}
