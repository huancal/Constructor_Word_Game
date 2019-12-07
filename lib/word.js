const letter = require('./letter')

function Word(wordanswer) {
    this.array = [];

    for (var i = 0; i < wordanswer.length; i++) {
        var letter = new Letter(wordanswer[i]);
        this.array.push(letter);
    };

    this.log = function () {
        var answerLog = "";
        for (var i = 0; i < this.array.length; i++) {
            answerLog += this.array[i] + " ";
        }
        console.log(answerLog + "\n==================\n");

    };
    this.userGuess = function (input) {
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].guess(input)
        }
    };
}

module.exports = Word;