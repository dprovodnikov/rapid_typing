(function(utils, counter) {
  let inputline, wordline, letters, untypedClass, wrongClass, ctrlPressed, errorCounter;

  inputline = $('.inputline');
  wordline = $('.wordline');
  letters = '';
  untypedClass = 'untyped';
  wrongClass = 'wrong';
  ctrlPressed = false;

  inputline.keypress(e => {
    let isOk = check(String.fromCharCode(e.keyCode));

    if(!isOk) {
      letters.length ? highlight() : fill();
    } 

    return isOk;
  });

  // backspace is forbidden, but with ctrl it's possible to delete the entire last word
  inputline.keydown(e => {
    if(e.keyCode == 17) ctrlPressed = true;

    if(e.keyCode == 8) {
      if(ctrlPressed) {
        ctrlPressed = false;
        let curValue = inputline.val().trim();

        let lastSpaceIndex = curValue.lastIndexOf(' ');

        rollback(lastSpaceIndex);

      } else 
        return false
    }

    if(e.keyCode == 13) {
      if( $(`.${untypedClass}`).length == 0)
        clean();
    } 

  });

  function highlight() {
    inputline.addClass(wrongClass);
    let untyped = $(`.${untypedClass}`);
    untyped.addClass(wrongClass)
    setTimeout(() => {
      inputline.removeClass(wrongClass)
      untyped.removeClass(wrongClass)
    } , 200);

    console.log( errorCounter() );
    
    return false
  }

  function rollback(index) {
    let letters = $('.letter');
    for(let i = index+1; i < letters.length; i++) {
      letters.eq(i).addClass(untypedClass);
    }
  }

  function clean() {
    letters = [];
    wordline.text('');
    inputline.val('');
  }

  function check(letter) {
    let untyped = $(`.${untypedClass}`);

    let output = false;

    if(letter == untyped.eq(0).text()) {
      untyped.eq(0).removeClass(untypedClass);
      output = true;
    }

    if(untyped.length == 0 && letter == ' ') {
      output = false
      clean();
    }

    return output;
  }

  function fill() {
    letters = utils.getWords(4);

    errorCounter = counter();

    let markup = '';
    for(let letter of letters)
      markup += `<span class="untyped letter">${letter.toLowerCase()}</span>`

    wordline.append(markup);

    inputline.width(wordline.width());
  }

  fill();
  
})(window.utils, window.counter);
