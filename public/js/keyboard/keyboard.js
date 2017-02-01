export default class Keyboard {
  constructor() {
    this.root = $('.keyboard-container');
    this.keys = $('.keyboard-container .key');
    this.tools = $('.keyboard-toolbar .tool')
    this.keyTargetClass = 'key-target';
    this.righthandedSpace = 'righthand';

    this.leftHalf = 'q w e r t a s d f g z x c v b'.split(/\s/);

    this._bindEvents();
  }

  _bindEvents() {
    this.tools.filter('#keyboard-toggle').click(e => {
      this.root.toggleClass('hidden');
    });

    this.tools.filter('#hands-toggle').click(e => {
      this.root.toggleClass('non-hands');
    });

    this.tools.filter('#color-toggle').click(e => {
      this.root.toggleClass('colorful');
    });
  }

  _isUpper(letter) {
    return letter == letter.toUpperCase()
  }

  _isIn(array, item) {
    return array.includes(item);
  }

  _handForSpace(pressed) {
    return this.leftHalf.includes(pressed) ? this.righthandedSpace : ''
  }

  highlight(pressed, toPress) {

    this.keys.removeClass(this.keyTargetClass);

    if(toPress == 'space') {
      let space = this.keys.filter('#space');

      if(space.hasClass(this.righthandedSpace)) {
        space.removeClass(this.righthandedSpace);
      }

      space.addClass(this.keyTargetClass + ' ' + this._handForSpace(pressed));
    } else {

      let isUpper = this._isUpper(toPress);

      toPress = toPress.toLowerCase();

      if(isUpper) {

        let side = this.leftHalf.includes(toPress) ? 'r' : 'l'; // r - right hand (l - left)

        this.keys.filter(`#shift-${side}`).addClass(this.keyTargetClass);
      }

      this.keys.filter(`#${toPress}`).addClass(this.keyTargetClass);

    }

  }
}