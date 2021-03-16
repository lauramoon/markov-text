/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};
    for (let i=0; i < this.words.length; i++) {
      let word = this.words[i];
      const nextWord = this.words[i+1] ? this.words[i+1] : null;
      chains[word] ? chains[word].push(nextWord) : chains[word] = [nextWord];
    }
    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let words = Object.keys(this.chains);

    function randomPick(wordList) {
      return wordList[Math.floor(words.length * Math.random())];
    }

    let text = randomPick(words);
    let word = text;

    for (let i=0; i < numWords - 1; i++) {
      text += " ";
      let nextSet = this.chains[word];
      let pick = randomPick(nextSet);
      word = pick ? pick : randomPick(words)
      text += word;
    }
    return text;
  }
}

module.exports = {MarkovMachine}