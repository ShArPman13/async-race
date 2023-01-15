export function animationStart(car: HTMLElement, container: HTMLElement, ms: number) {
  const monsterCar = car;
  const road = container;
  console.log(ms);
  monsterCar.style.left = `${road.getBoundingClientRect().width - 100}px`;
  monsterCar.style.transitionDuration = `${ms}ms`;
  monsterCar.style.transitionDelay = 'ease';
}
