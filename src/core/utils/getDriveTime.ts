import { startEngine } from '../api/startEngine';
import { IStartEngineData } from '../types/IStartEngineData';

export async function getDriveTime(id: number) {
  const data: IStartEngineData = await startEngine(id);
  const time = data.distance / data.velocity;
  return time;
}
