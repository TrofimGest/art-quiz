class Settings {
  constructor() {
    this.settings = {};
    this.lastVolume = 1;
  }

  async render() {
    const url = './views/settings.html';
    const response = await fetch(url);
    const data = await response.text();
    return data;
  }

  async afterRender() {
    const music = document.querySelector('.audio1');
    const volumeContainer1 = document.getElementById('volume-progress-container1');
    const volumeProgress1 = document.getElementById('volume-progress1');
    const volumeIcon = document.getElementById('v1');

    this.quiz = { };
    volumeContainer1.addEventListener('click', () => this.changeVolume(event, music, volumeProgress1, volumeContainer1, volumeIcon));
    volumeIcon.addEventListener('click', () => this.mute(music, volumeProgress1, volumeIcon));
  }

  changeVolume(event, music, volumeProgress1, volumeContainer1) {
    const progressBar = volumeProgress1;
    const mus = music;
    let volume = event.offsetX / volumeContainer1.offsetWidth;
    if (volume < 0.1) {
      volume = 0;
    }
    if (volume > 0.9) {
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
