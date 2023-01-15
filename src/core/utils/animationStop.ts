export function animationStop(car: HTMLElement) {
  const monsterCar = car;
  monsterCar.style.left = '0';
  monsterCar.style.transitionDuration = '0s';
  monsterCar.style.rotate = '0deg';
}
