export class Header {
  container: HTMLHeadElement = document.createElement('header');

  render() {
    this.container.innerHTML = '';
    this.container.className = 'header';

    const wrapper = document.createElement('div');
    wrapper.className = 'header-wrapper';

    const garageBTN = document.createElement('button');
    garageBTN.className = 'header__btn';
    garageBTN.innerText = 'GARAGE';
    const winnersBTN = document.createElement('button');
    winnersBTN.className = 'header__btn';
    winnersBTN.innerText = 'WINNERS';

    garageBTN.addEventListener('click', () => {
      window.location.hash = '/garage';
    });

    winnersBTN.addEventListener('click', () => {
      window.location.hash = '/winners';
    });

    wrapper.append(garageBTN, winnersBTN);

    this.container.append(wrapper);
    return this.container;
  }
}
