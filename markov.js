/** Textual markov chain generator */


class MarkovMachine {

    /** build markov machine; read in text.*/
  
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
    //   splits on spaces and linebreak characters to make a list of words.
      this.words = words.filter(c => c !== "");
    //   want this explained - I know we end up with a list of words but what is the last part doing that the first line in the function isn't to make that happen?
      this.makeChains();
    //   calls a function that builds a map of chains of word to possible next words
    }
  
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  
    makeChains() {
      let chains = new Map();
  
      for (let i = 0; i < this.words.length; i += 1) {
        let word = this.words[i];
        // for "the cat in the hat" words[0] is "the"
        let nextWord = this.words[i + 1] || null;
  
        if (chains.has(word)) chains.get(word).push(nextWord);
        else chains.set(word, [nextWord]);
      }
    //   don't understand this - if the word is already in chains (don't understand next part), and if the word is not in chains, add word together with the next word
  
      this.chains = chains;
    //   why is this necessary? what does it accomplish?
    }
  
  
    /** Pick random choice from array */
  
    static choice(ar) {
      return ar[Math.floor(Math.random() * ar.length)];
    }
  
  
    /** return random text from chains */
  
    makeText(numWords = 100) {
      // pick a random key to begin
      let keys = Array.from(this.chains.keys());
      let key = MarkovMachine.choice(keys);
    //   what is .choice?
      let out = [];
  
      // produce markov chain until reaching termination word
      while (out.length < numWords && key !== null) {
        out.push(key);
        key = MarkovMachine.choice(this.chains.get(key));
      }
  
      return out.join(" ");
    }
  }
  
  
  module.exports = {
    MarkovMachine,
  };