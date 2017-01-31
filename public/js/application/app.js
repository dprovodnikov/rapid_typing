import Wordline from '../wordline/wordline';

export default class Application {
  constructor() {
    this.modeSelect = $('.mode-select');
    this.modeTitle = $('.mode-title');

    this.openClass = 'open';

    this.mode = 'novice';

    this.setMode(this.mode);

    this.bindEvents();
  }

  setMode(mode) {
    this.modeTitle.html(mode.replace(/(\b\w)/, letter => letter.toUpperCase()));
    this.wordline = new Wordline(mode);
    this.wordline.setFocus();
  }

  bindEvents() {
    this.modeSelect.click(e => {
      e.stopPropagation();

      this.modeSelect.toggleClass(this.openClass);
    });

    this.modeSelect.find('li').click(e => {
      e.stopPropagation();

      this.setMode( $(e.target).attr('id') );

      this.modeSelect.removeClass(this.openClass);
    });

    $(document).click(e => {
      this.modeSelect.removeClass(this.openClass);
    });
  }

}