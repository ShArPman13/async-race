export class Footer {
  container: HTMLHeadElement = document.createElement('footer');

  render() {
    this.container.innerHTML = '';
    this.container.className = 'footer';

    const wrapper = document.createElement('div');
    wrapper.className = 'footer-wrapper';

    const linkGit = document.createElement('a');
    linkGit.href = 'https://github.com/ShArPman13';

    const imgGitSharp = document.createElement('img');
    imgGitSharp.src = '../assets/svg/git_white.svg';
    imgGitSharp.alt = 'Git_ShArP';
    imgGitSharp.className = 'footer__img git';

    linkGit.append(imgGitSharp);

    const year = document.createElement('span');
    year.className = 'footer__year';
    year.textContent = '2023';

    const linkRSS = document.createElement('a');
    linkRSS.href = 'https://rs.school/';

    const imgRS = document.createElement('img');
    imgRS.src = '../assets/svg/rss_white.svg';
    imgRS.alt = 'RSS';

    linkRSS.append(imgRS);

    wrapper.append(linkRSS, year, linkGit);

    this.container.append(wrapper);

    return this.container;
  }
}
