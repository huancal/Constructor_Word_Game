// var game = require('./lib/game')

// // Initialize a new Game object
// var game = new Game();

// // Start playing
// game.play();

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