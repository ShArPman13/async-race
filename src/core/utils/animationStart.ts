export function animationStart(car: HTMLElement, container: HTMLElement, ms: number) {
  const monsterCar = car;
  const road = container;
  if (window.screen.width > 600) {
    monsterCar.style.left = `${road.getBoundingClientRect().width - 100}px`;
  } else {
    monsterCar.style.left = `${road.getBoundingClientRect().width - 70}px`;
  }

  monsterCar.style.transitionDuration = `${ms}ms`;
  monsterCar.style.transitionDelay = 'ease';
}
