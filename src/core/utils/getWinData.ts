import { getWinners } from '../api/getWinners';
import { IWinner } from '../types/IWinner';
import { SortOption } from '../types/SortOption';

export async function getWinData(page: number, sort: string = SortOption.IdASC) {
  const winnersTable: IWinner[] = await getWinners(sort, page);
  return winnersTable;
}
