import { createWinner } from '../api/createWinner';
import { getWinner } from '../api/getWinner';
import { updateWinner } from '../api/updateWinner';
import { ICarFieldObj } from '../types/ICarFieldObj';
import { ICarWin } from '../types/ICarWin';

export const createWinnerInApi = async (car: ICarFieldObj, mSec: number) => {
  try {
    await createWinner({
      id: car.id,
      wins: 1,
      time: Number((mSec / 1000).toFixed(1)),
    });
    // console.log('created');
  } catch (err) {
    const winner: ICarWin = await getWinner(car.id);
    const newTime = Number((mSec / 1000).toFixed(1));
    // console.log('get winner', 'id', winner.id, 'wins', winner.wins);
    await updateWinner(car.id, {
      wins: winner.wins + 1,
      time: winner.time < newTime ? winner.time : newTime,
    });
    // console.log('error - updated');
  }
  return car;
};
