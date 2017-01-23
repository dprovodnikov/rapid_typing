let inputline = $('.inputline');
let wordline = $('.wordline');
let words = 'Sometimes the same is different'.split('');


inputline.on('keypress', function(e) {
  let isOk = check(String.fromCharCode(e.keyCode));

  if(!isOk) {
    inputline.addClass('wrong');
    setTimeout(() => inputline.removeClass('wrong'), 200);
  }

  return isOk;
});

inputline.on('keydown', function(e) {
  return e.keyCode != 8
});

function check(letter) {
  let untypedClass = 'untyped';
  let untyped = $(`.${untypedClass}`);

  let output = false;

  if(letter == untyped.eq(0).text()) {
    untyped.eq(0).removeClass(untypedClass);
    output = true;
  }

  return output;
}

(function fill() {
  let markup = '';

  for(let word of words) {
    markup += `<span class="untyped">${word}</span>`
  }

  wordline.append(markup);
})()
