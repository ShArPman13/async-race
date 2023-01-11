export class Garage {
  container: HTMLDivElement = document.createElement('div');

  render() {
    this.container.className = 'garage';

    const wrapper = document.createElement('div');
    wrapper.className = 'garage-wrapper';

    this.container.append(wrapper);
    return this.container;
  }
}
