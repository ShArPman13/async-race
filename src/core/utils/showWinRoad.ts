export function showWin(flag: HTMLElement, winner: string, time: number) {
  flag.classList.add('won');
  flag.setAttribute('txt', `${winner} has won in ${time} sec`);
}
