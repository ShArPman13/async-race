import { getWinners } from '../api/getWinners';
import { IWinner } from '../types/IWinner';

export async function getWinnersData() {
  const winnersTable: IWinner[] = await getWinners();
  return winnersTable;
}
