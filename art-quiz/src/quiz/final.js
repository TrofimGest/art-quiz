class Final {
  constructor() {
    this.final = {};
  }

  async render() {
    const url = './views/final.html';
    const response = await fetch(url);
    const data = await response.text();
    return data;
  }

  async afterRender() {
    const score = localStorage.getItem('correctAnswers');
    const category = localStorage.getItem('category');
    this.showResult(score, category);
  }

  showResult(score, category) {
    localStorage.setItem(`${category}`, score);
    document.querySelector('.final__score').innerText = `${score}/10`;
  }
}

export default Final;
