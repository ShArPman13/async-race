export function animationStopCrash(car: HTMLElement, computedStyle: CSSStyleDeclaration) {
  const monsterCar = car;
  monsterCar.style.left = computedStyle.left;
  monsterCar.style.transitionDuration = '0s';
  monsterCar.style.rotate = '150deg';
}

// let requestID: number | null = null;

// export function animationMove(sec: number, road: HTMLElement, car: HTMLElement) {
//   let startAnimation: number | null = null;
//   const monsterCar = car;
//   const widthRoad = road.getBoundingClientRect().width;
//   const screen = window.screen.width;
//   const screenMinusRoad = screen - widthRoad;
//   const distance = screen - screenMinusRoad - 100;

//   function easeInOut(time: number) {
//     return 0.5 * (1 - Math.cos(Math.PI * time));
//   }

//   function move(time: number) {
//     if (!startAnimation) {
//       startAnimation = time;
//     }
//     const progress = (time - startAnimation) / sec;
//     const left = easeInOut(progress) * distance;
//     monsterCar.style.left = `${left}px`;

//     if (progress < 1) {
//       requestID = requestAnimationFrame(move);
//     }
//   }

// stop.addEventListener('click', () => {
//   if (requestID) {
//     cancelAnimationFrame(requestID);
//     monsterCar.style.left = '0px';
//     monsterCar.style.rotate = '0deg';
//   }
// });

//   requestAnimationFrame(move);
// }

// export function stopAnimation() {
//   if (requestID) {
//     cancelAnimationFrame(requestID);
//     console.log(requestID);
//   }
// }
