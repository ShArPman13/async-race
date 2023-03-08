export function getRandomNumberInArray(array: string[]) {
  const max = array.length - 1;
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
