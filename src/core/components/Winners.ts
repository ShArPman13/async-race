export class Winners {
  container: HTMLDivElement = document.createElement('div');

  render() {
    this.container.className = 'winners';

    const wrapper = document.createElement('div');
    wrapper.className = 'winners-wrapper';

    const text = document.createElement('div');
    text.innerText = 'WINNERS';
    wrapper.append(text);

    this.container.append(wrapper);
    return this.container;
  }
}
