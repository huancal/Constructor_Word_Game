var inquirer = require('inquirer')
var Word = require('./word')

var words = ['avengers', 'thanksgiving', 'christmas']

playGame = () => {

        // Save a reference for `this` in `self` as `this` will change inside of inquirer
        var self = this;

        this.play = function () {
            this.guessLeft = 10;
            this.nextWord();
        }



        this.nextWord = () => {
            var randomn = words[Math.floor(Math.random() * words.length)];
            this.currentWord = new Word(randomn)
            console.log("\n" + this.currentWord + "\n");
            this.makeGuess();
        }

        this.makeGuess = () => {
            this.askForLetter().then(function () {
                // If the user has no guesses remaining after this guess, show them the word, ask if they want to play again
                if (self.guessesLeft < 1) {
                    console.log(
                        "No guesses left! Word was: \"" + self.currentWord.getSolution() + "\"\n"

                    );
                    self.playAgain();
                } else if (self.currentWord.guessedCorrectly()) {
                    console.log("You got it right! Next word!");
                    self.guessesLeft = 10;
                    self.nextWord();
                    // Otherwise prompt the user to guess the next letter
                } else {
                    self.makeGuess();
                }
            });
        }

        this.playAgain = () => {
            inquirer.prompt([{
                type = "confirm",
                name: "choice",
                message = "Do you want to play again?"
            }]).then(function (val) {
                if (val.choice) {
                    self.play();

                } else(self.quitGame())

            });

        }

        this.quitGame = () => {
            console.log('Game Over!');
            process.exit(0);


        }




        this.askforLetters = () => {
            return inquirer.prompt([{
                type = "input",
                name: "choice",
                message: "Guess a letter",
                validate: function (val) {
                    // The users guess must be a number or letter
                    return /[a-z1-9]/gi.test(val);
                }



            }]).then(function (val) {
                // If the user's guess is in the current word, log that they chose correctly
                var guessCorrectly = self.currentWord.guessLetter(val.choice);
                if (guessLetter) {
                    console.log('correct guess');


                } else {
                    self.guessLeft--;
                    console.log('incorret guess');
                    console.log(self.guessLeft + " guesses remaining!!!\n");
                }
            });
        }


        module.exports = playGame();