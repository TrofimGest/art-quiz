class Start {
  constructor() {
    this.start = { };
  }

  async render() {
    const url = './views/start.html';
    const response = await fetch(url);
    const data = await response.text();
    return data;
  }

  async afterRender() {
    // const categoryElement = document.getElementById('category');
    const startButtons = document.querySelectorAll('.start__btn');

    for (let i = 0; i < startButtons.length; i += 1) {
      startButtons[i].addEventListener('click', () => { localStorage.setItem('game', i); });
    }
  }
}

export default Start;
