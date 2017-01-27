import Generator from './generator';
import SpeedStats from './speed_stats'
import ErrorStats from './error_stats';
import Counter from './counter';

export default class Wordline {
  constructor(mode) {
    this.mode = mode;

    this.inputline = $('.inputline');
    this.wordline = $('.wordline');

    this.inputline.val('')

    this.errorStats = new ErrorStats();
    this.speedStats = new SpeedStats();
    this.errorCounter = new Counter();
    this.generator = new Generator({ interval: 6e4, number: 8 });
    this.letters = '';

    this.untypedClass = 'untyped';
    this.wrongClass = 'wrong';
    this.ctrlPressed = false;

    this.bindEvents();

    /*
    * true means that it's an initial fill,
    * so the function will not do certain things like statistic update requests
    */
    this.fill(true);
  }

  bindEvents() {
    this.inputline.off();

    this.inputline.keypress(e => {

      if(this.letters.length == $(`.${this.untypedClass}`).length && e.keyCode != 13) {
        this.timeStart = Date.now();
      }

      let isOk = this.check(String.fromCharCode(e.keyCode));

      if(!isOk) {
        this.letters.length ? this.highlight() : this.fill();
      } 

      return isOk;
    });

    // backspace is forbidden, but with ctrl it's possible to delete the entire last word
    this.inputline.keydown(e => {
      if(e.keyCode == 17) this.ctrlPressed = true;

      if(e.keyCode == 8) {
        if(this.ctrlPressed) {
          this.ctrlPressed = false;
          let curValue = this.inputline.val().trim();

          let lastSpaceIndex = curValue.lastIndexOf(' ');

          this.rollback(lastSpaceIndex);

        } else return false
      }

      if(e.keyCode == 13) {
        if( $(`.${this.untypedClass}`).length == 0) {
          this.clean();
        }
      } 

    });
  }

  highlight() {
    let untyped = $(`.${this.untypedClass}`);

    untyped.addClass(this.wrongClass)
    this.inputline.addClass(this.wrongClass);

    setTimeout(() => {
      this.inputline.removeClass(this.wrongClass)
      untyped.removeClass(this.wrongClass)
    } , 200);
    
    this.errorCounter.up();

    return false
  }

  rollback(index) {
    let letterEls = $('.letter');
    for(let i = index+1; i < letterEls.length; i++)
      letterEls.eq(i).addClass(this.untypedClass);
  }

  clean() {
    this.letters = [];
    this.wordline.text('');
    this.inputline.val('');
  }

  check(letter) {
    let untyped = $(`.${this.untypedClass}`);

    let output = false;

    if(letter == untyped.eq(0).text()) {
      untyped.eq(0).removeClass(this.untypedClass);
      output = true;
    }

    if(untyped.length == 0 && letter == ' ') {
      output = false
      this.clean();
    }

    return output;
  }

  fill(isInit) {

    if(this.mode == 'beginner')
      this.letters = this.generator.getOne();
    else
      this.letters = this.generator.getWords();

    if(!isInit) {
      this.errorStats.update(this.errorCounter, this.letters);

      let timeEnd = Date.now();

      this.speedStats.update(timeEnd - this.timeStart, this.letters);

      this.errorCounter.reset();
    }

    let markup = '';
    for(let letter of this.letters)
      markup += `<span class="untyped letter">${letter.toLowerCase()}</span>`

    this.wordline.html(markup);

    this.inputline.width(this.wordline.width());
  }
}
