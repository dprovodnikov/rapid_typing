export default class Keyboard {
  constructor() {
    this.keys = $('.keyboard-container .key');
    this.tools = $('.keyboard-toolbar .tool')
    this.keyTargetClass = 'key-target';
    this.righthandedSpace = 'righthand';

    this.leftHalf = 'q w e r t a s d f g z x c v b'.split(/\s/);
  }

  _isUpper(letter) {
    return letter == letter.toUpperCase()
  }

  _isIn(array, item) {
    let isIn = false;

    for(let _item of array) {
      if(_item == item) {
        isIn = true
        break;
      }
    }

    return isIn;
  }

  _handForSpace(pressed) {
    return this._isIn(this.leftHalf, pressed) ? this.righthandedSpace : ''
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
      this.keys.filter(`#${toPress}`).addClass(this.keyTargetClass);
    }

  }
}