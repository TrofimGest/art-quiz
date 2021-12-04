class Category {
  constructor() {
    this.category = {};
    this.categoryArr = ['Realism', 'Impressionism', 'Religion', 'Portrait', 'Marine', 'Renaissance', 'Landscape', 'Avant-garde', 'Surrealism', 'Romanticism'];
  }

  async render() {
    const url = './views/category.html';
    const response = await fetch(url);
    const data = await response.text();
    return data;
  }

  async afterRender() {
    const categoryBlock = document.querySelectorAll('.category__block');
    const categoryBtns = document.querySelectorAll('.category__btn');
    for (let i = 0; i < categoryBtns.length; i += 1) {
      categoryBtns[i].addEventListener('click', () => { localStorage.setItem('category', this.categoryArr[i]); });
    }
    this.getScore(categoryBlock);
  }

  getScore(categoryBlock) {
    for (let i = 0; i < this.categoryArr.length; i += 1) {
      const fullScore = localStorage.getItem(`${this.categoryArr[i]}`);
      if (fullScore) {
        document.getElementById(`${this.categoryArr[i]}`).innerText = `${fullScore}/10`;
        categoryBlock[i].classList.add('played');
      }
    }
  }
}
export default Category;
