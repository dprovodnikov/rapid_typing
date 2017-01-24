window.counter = (function() {
  let count = 0;

  return function() {
    let output = function() {
      return ++count;
    }

    output.get = function() { return count }
    output.set = function(arg) { count = arg }
    output.reset = function() { count = 0 }

    return output;
  }

})()