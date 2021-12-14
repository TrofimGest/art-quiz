import Question from './question.js';

class Quiz {
  constructor() {
    this.quiz = {};
    this.questions = [];
    this.imgDataset = [];
    this.totalAmount = 10;
    this.answeredAmount = 0;
  }

  async render() {
    const url = (localStorage.getItem('game')) ? './views/quiz.html' : './views/quiz.html';
    const response = await fetch(url);
    const data = await response.text();

    this.imgDataset = await this.startGame();
    return data;
  }

  async afterRender() {
    const answerElems = [
      document.querySelector('#a1'),
      document.querySelector('#a2'),
      document.querySelector('#a3'),
      document.querySelector('#a4'),
    ];
    const pagination = document.querySelectorAll('.quiz__dot');

    const modal = document.querySelector('.quiz__modal');
    const closeModal = document.querySelector('.quiz__skip-btn');
    const modalType = document.querySelector('.quiz__modal-type');

    this.questions = await this.setQuestions();

    for (let i = 0; i < answerElems.length; i += 1) {
      answerElems[i].addEventListener('click', () => this.nextQuestion(answerElems[i], pagination, modal, modalType));
    }

    closeModal.addEventListener('click', () => this.toggleMenu(modal));
    this.renderQuestion();
  }

  async setQuestions() {
    return Promise.all(this.imgDataset
      .map(async (question) => new Question(question, await this.getIncorrect())));
  }

  async getIncorrect() {
    try {
      const url = './images.json';
      const response = await fetch(url);
      const result = await response.json();
      const incorrectArr = [];
      for (let i = 0; i < 3; i += 1) {
        const rand = result.images[Math.floor(Math.random() * 241)];
        incorrectArr.push(rand.author);
      }
      return incorrectArr;
    } catch (error) {
      alert(error);
      return 1;
    }
  }

  renderQuestion() {
    const question = this.questions[this.answeredAmount];
    question.render();
  }

  nextQuestion(answer, pagination, modal, modalType) {
    if (answer.firstChild.checked || answer.id === 'incorrect__label') {
      this.questions[this.answeredAmount].checkAnswer(answer);
      this.showResult(pagination, modalType);
      this.toggleMenu(modal);
      this.questions[this.answeredAmount].fillModal();
      this.answeredAmount += 1;
    }
  }

  showResult(pagination, modalType) {
    if (this.questions[this.answeredAmount].isCorrect) {
      pagination[this.answeredAmount].classList.add('quiz__correct');
      modalType.innerText = "Correct answer! It's:";
    } else {
      pagination[this.answeredAmount].classList.add('quiz__incorrect');
      modalType.innerText = "Wrong answer! It's:";
    }
  }

  endGame() {
    const correctAnswersTotal = this.calculateCorrectAnswers();
    localStorage.setItem('correctAnswers', correctAnswersTotal);
    window.location.hash = '#final';
  }

  async startGame() {
    try {
      const url = './images.json';
      const category = localStorage.getItem('category') || 'portrait';
      const response = await fetch(url);
      const result = await response.json();
      const res = result.images.filter((image) => image.category === category.toLowerCase())
        .slice(0, 10);
      return res;
    } catch (error) {
      return 1;
    }
  }

  toggleMenu(modal) {
    modal.classList.toggle('show-menu');
    if (this.answeredAmount < this.totalAmount) {
      this.renderQuestion();
    } else {
      this.endGame();
    }
  }

  calculateCorrectAnswers() {
    let count = 0;
    this.questions.forEach((el) => {
      if (el.isCorrect) {
        count += 1;
      }
    });
    return count;
  }
}

export default Quiz;
