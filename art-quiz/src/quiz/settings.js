class Settings {
  constructor() {
    this.settings = {};
    this.lastVolume = 0.5;
    this.isPlaying = false;
  }

  async render() {
    const url = './views/settings.html';
    const response = await fetch(url);
    const data = await response.text();
    return data;
  }

  async afterRender() {
    const music = document.querySelector('.audio1');
    const volumeText = document.getElementById('volume-text');
    const musicBtn = document.querySelector('.settings__btn-container');
    const BtnText = document.querySelector('.settings__type');
    const volumeBar = document.querySelector('.volume');
    const widthCount = document.querySelector('.volume__mousemove-container');
    const container = document.getElementById('volume-progress-container1');
    const progress = document.getElementById('volume-progress1');
    const volumeIcon = document.getElementById('v1');

    this.quiz = { };
    musicBtn.addEventListener('click', () => (this.isPlaying ? this.pauseMusic(music, musicBtn, volumeBar, BtnText, volumeText)
      : this.playMusic(music, musicBtn, volumeBar, BtnText, volumeText)));

    widthCount.addEventListener(
      'mousemove',
      () => this.changeVolume(event, music, progress, container, volumeIcon),
    );
    volumeIcon.addEventListener('click', () => this.mute(music, progress, volumeIcon));
  }

  playMusic(music, musicBtn, volumeBar, BtnText, volumeText) {
    this.isPlaying = true;
    musicBtn.style.background = 'var(--main-color)';
    BtnText.innerText = 'Выключить музыку';
    BtnText.style.color = 'var(--white-color)';
    music.play();
    volumeBar.style.opacity = '1';
    volumeText.style.opacity = '1';
  }

  pauseMusic(music, musicBtn, volumeBar, BtnText, volumeText) {
    this.isPlaying = false;
    musicBtn.style.background = 'var(--white-color)';
    BtnText.innerText = 'Включить музыку';
    BtnText.style.color = 'var(--black-color)';
    volumeBar.style.opacity = '0';
    volumeText.style.opacity = '0';
    music.pause();
  }

  changeVolume(event, music, volumeProgress1, volumeContainer1) {
    const progressBar = volumeProgress1;
    const mus = music;
    let volume = event.offsetX / volumeContainer1.offsetWidth;
    if (volume < 0.05) {
      volume = 0;
    }
    if (volume > 0.95) {
      volume = 1;
    }
    progressBar.style.width = `${volume * 100}%`;
    mus.volume = volume;
    this.lastVolume = volume;
  }

  mute(music, volumeProgress1, volumeIcon) {
    const progressBar = volumeProgress1;
    const mus = music;
    if (music.volume) {
      this.lastVolume = music.volume;
      mus.volume = 0;
      progressBar.style.width = 0;
      volumeIcon.classList.replace('bxs-volume-full', 'bxs-volume-mute');
    } else {
      mus.volume = this.lastVolume;
      progressBar.style.width = `${this.lastVolume * 100}%`;
      volumeIcon.classList.replace('bxs-volume-mute', 'bxs-volume-full');
    }
  }
}

export default Settings;
