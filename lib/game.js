const inquirer = require('inquirer')
const Word = require('./word')

var wordArray = ['avengers', 'thanksgiving', 'christmas'];

var letterArray = ['abcdefghijklmnopqrstuvwxyz'];

var randomIndex = Math.floor(Math.random() * wordArray.length)
var randomWord = wordArray[randomIndex];

var computerWord = new Word(randomWord);

var requireNewWord = false;
var incorretLetters = [];
var correctLetters = [];

var guessLeft = 10;

function gameLogic() {
    if (requiredNewWord) {
        var randomIndex = Math.floor(Math.random() * wordArray.length)
        var randomWord = wordArray[randomIndex];

        computerWord = new Word(randomWord);

        requiredNewWord = false;

    }

    var wordComplete = [];

    if (wordComplete.includes(false)) {
        inquirer.prompt([{
                type: "input",
                message: 'select a letter from A to Z',
                name: "userinput"
            }

        ]).then(function (input) {
            if (!letterArray.includes(input.userinput) ||
                input.userinput.length > 1) {

            } {
                console.log("\nTry again!\n");
                gameLogic();
            } else {
                if (
                    incorretLetters.includes(input.userinput) ||
                    correctLetters.includes(input.userinput) ||
                    input.userinput === ""
                ) {
                    console.log("\nAlready guessed or nothing was entered\n");
                    gameLogic();

                } else {
                    var wordCheck = [];
                    computerWord.userGuess(input.userinput);
                    computerWord.array.forEach(wordCheck);
                    if (wordCheck.join("") === wordComplete.join("")) {
                        console.log("\nIncorrect!\n");

                        incorretLetters.push(input.userinput);
                        guessLeft--;

                    } else {
                        console.log("\nCorrect!\n");
                        correctLetters.push(input.userinput);
                    }
                    computerWord();

                    console.log("Guesses Left:" + guessLeft + "\n");
                    console.log("Letters Guessed:" + incorretLetters.join(" ") + "\n");

                    if (guessLeft > 0) {
                        gameLogic();

                    } else {
                        console.log("You lose, try again!\n");

                    }

                    function wordCheck(key) {
                        wordCheck.push(key.guessed);
                    }

                }
            }
        });
    } else {
        console.log("You win!\n");

    }

    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }

}

function restartGame() {
    inquirer.prompt([{
        type: "list",
        message: "What would you like to do next?",
        choices: ["Play Again", "Quit"],
        name: "restart"

    }]).then(function (input) {
        if (input.restart === "Play Again") {
            requireNewWord = true;
            incorretLetters = [];
            correctLetters = [];
            guessLeft = 10;
            gameLogic();
        } else {
            return;
        }

    });
}

gameLogic();






// playGame = () => {

//         // Save a reference for `this` in `self` as `this` will change inside of inquirer
//         var self = this;

//         this.play = function () {
//             this.guessLeft = 10;
//             this.nextWord();
//         }



//         this.nextWord = () => {
//             var randomn = words[Math.floor(Math.random() * words.length)];
//             this.currentWord = new Word(randomn)
//             console.log("\n" + this.currentWord + "\n");
//             this.makeGuess();
//         }

//         this.makeGuess = () => {
//             this.askForLetter().then(function () {
//                 // If the user has no guesses remaining after this guess, show them the word, ask if they want to play again
//                 if (self.guessesLeft < 1) {
//                     console.log(
//                         "No guesses left! Word was: \"" + self.currentWord.getSolution() + "\"\n"

//                     );
//                     self.playAgain();
//                 } else if (self.currentWord.guessedCorrectly()) {
//                     console.log("You got it right! Next word!");
//                     self.guessesLeft = 10;
//                     self.nextWord();
//                     // Otherwise prompt the user to guess the next letter
//                 } else {
//                     self.makeGuess();
//                 }
//             });
//         }

//         this.playAgain = () => {
//             inquirer.prompt([{
//                 type = "confirm",
//                 name: "choice",
//                 message = "Do you want to play again?"
//             }]).then(function (val) {
//                 if (val.choice) {
//                     self.play();

//                 } else(self.quitGame())

//             });

//         }

//         this.quitGame = () => {
//             console.log('Game Over!');
//             process.exit(0);


//         }




//         this.askforLetters = () => {
//             return inquirer.prompt([{
//                 type = "input",
//                 name: "choice",
//                 message: "Guess a letter",
//                 validate: function (val) {
//                     // The users guess must be a number or letter
//                     return /[a-z1-9]/gi.test(val);
//                 }



//             }]).then(function (val) {
//                 // If the user's guess is in the current word, log that they chose correctly
//                 var guessCorrectly = self.currentWord.guessLetter(val.choice);
//                 if (guessLetter) {
//                     console.log('correct guess');


//                 } else {
//                     self.guessLeft--;
//                     console.log('incorret guess');
//                     console.log(self.guessLeft + " guesses remaining!!!\n");
//                 }
//             });
//         }


//         module.exports = playGame();