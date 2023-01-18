export function animationStop(car: HTMLElement) {
  const monsterCar = car;
  monsterCar.style.rotate = '0deg';
  monsterCar.style.left = '0';
  monsterCar.style.transitionDuration = '0s';
}
