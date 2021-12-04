class Question {
  constructor(question, answerArr) {
    this.pictureEl = document.querySelector('.quiz__img-img');
    this.modalAuthor = document.querySelector('.quiz__modal-author');
    this.modalYear = document.querySelector('.quiz__modal-year');
    this.modalName = document.querySelector('.quiz__modal-name');
    this.modalImg = document.querySelector('.quiz__modal-img');
    this.answerElements = [
      document.querySelector('#a1'),
      document.querySelector('#a2'),
      document.querySelector('#a3'),
      document.querySelector('#a4'),
    ];
    this.picName = question.name;
    this.picYear = question.year;
    this.pictureElem = question.imageNum;
    this.correctAnswer = question.author;
    this.isCorrect = false;
    answerArr.push(this.correctAnswer);
    this.answers = this.shuffleAnswers(answerArr);
  }

  shuffleAnswers(answers) {
    const z = answers;
    for (let i = z.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const temp = z[i];
      z[i] = z[j];
      z[j] = temp;
    }
    return z;
  }

  answer(checkedElement) {
    this.isCorrect = (checkedElement.childNodes[1].textContent === this.correctAnswer);
  }

  fillModal() {
    this.modalAuthor.innerHTML = this.correctAnswer;
    this.modalYear.innerHTML = this.picYear;
    this.modalName.innerHTML = this.picName;
    this.modalImg.src = `https://raw.githubusercontent.com/TrofimGest/image-data/master/img/${this.pictureElem}.jpg`;
  }

  getImage() {
    const quizImg = new Image();
    quizImg.src = `https://raw.githubusercontent.com/TrofimGest/image-data/master/img/${this.pictureElem}.jpg`;
    quizImg.onload = () => {
      this.pictureEl.style.backgroundImage = `url(https://raw.githubusercontent.com/TrofimGest/image-data/master/img/${this.pictureElem}.jpg)`;
    };
  }

  render() {
    this.answerElements.forEach((el, index) => {
      const answer = el;
      answer.innerHTML = `<input type="radio" name="radio"><span class="checkmark">${this.answers[index]}</span>`;
      this.getImage();
    });
  }
}

export default Question;
