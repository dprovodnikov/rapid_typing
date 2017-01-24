(function(words) {
  const rand = (low, high) => Math.floor((high-low+1)*Math.random())+Math.floor(low);

  const getWords = (number) => {
    let output = [];

    for(let i = 0; i < number; i++)
      output.push(words[rand(0, words.length-1)])
    
    return output.join(' ');
  }

  window.utils = {
    getWords: getWords
  };

})(window.words)
