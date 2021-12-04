class Time {
  constructor(incorrectBtn) {
    this.timerEl = document.querySelector('.timer');
    this.timer = '';
    this.nextBtn = document.getElementById('incorrect__label');
    this.incorrectBtn = incorrectBtn;
  }

  createTimeIsOutEvent() {
    const event = new Event('click');
    this.incorrectBtn.dispatchEvent(event);
  }

  getTime() {
    const time = localStorage.getItem('time');
    if (time === 'off') {
      this.timerEl.classList.add('disp__none');
    } else {
      this.timerEl.classList.remove('disp__none');
      return time;
    }
  }

  clearTime() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  showTime(storageTime) {
    this.clearTime();
    let timeleft = storageTime;
    this.timer = setInterval(() => {
      this.timerEl.textContent = timeleft;
      timeleft -= 1;
      if (timeleft <= 0) {
        this.createTimeIsOutEvent();
        this.clearTime();
      }
    }, 1000);
  }
}

export default Time;
