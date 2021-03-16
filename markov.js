/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
    this.makeBigrams();
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

  /** make bigrams:
   * 
   * for text of "the cat in the hat", chains will be
   * {"the cat": [in], "cat in": [the], "in the": [hat], "the hat": [null]}
   */

  makeBigrams() {
    let bigrams = {}
    let firstWord = this.words[0]
    for (let i=1; i < this.words.length; i++) {
      let word = this.words[i];
      const nextWord = this.words[i+1] ? this.words[i+1] : null;
      let bigram = `${firstWord} ${word}`;
      bigrams[bigram] ? bigrams[bigram].push(nextWord) : bigrams[bigram] = [nextWord];
      firstWord = word;
    }
    this.bigrams = bigrams;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let words = Object.keys(this.chains);

    let text = this.randomPick(words);
    let firstWord = text;
    let nextWord = this.singleChain(firstWord);

    for (let i=1; i < numWords - 1; i++) {
      text += " ";
      let bigram = `${firstWord} ${nextWord}`;
      firstWord = nextWord;
      if (this.bigrams[bigram]) {
        let pick = this.randomPick(this.bigrams[bigram]);
        nextWord = pick ? pick : this.randomPick(words);
      } else {
        nextWord = this.singleChain(firstWord);
      }
      text += nextWord;
    }
    return text;
  }

  singleChain(word) {
    let nextSet = this.chains[word];
    let pick = this.randomPick(nextSet);
    return pick ? pick : this.randomPick(words);
  }

  randomPick(wordList) {
    return wordList[Math.floor(wordList.length * Math.random())];
  }
}

module.exports = {MarkovMachine}
