const letter = require('./letter')

function Word(word) {
    this.letter = word.split("").map(function (char) {
        return new Letter(char);
    });
}