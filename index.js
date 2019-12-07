var Word = require('./lib/word');
var inquirer = require('inquirer');

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var Superheroes = ["avengers", "batman", "superman"];


// selects random word from wordArray
var randomIndex = Math.floor(Math.random() * Superheroes.length)
var randomWord = Superheroes[randomIndex];

// passing random word through constructor
var computerWord = new Word(randomWord);

var requireNewWord = false;

//array for letters guessd by user 
var incorretLetters = [];
var correctLetters = [];

var guessLeft = 10;


function gameLogic() {
    if (requireNewWord) {
        var randomIndex = Math.floor(Math.random() * Superheroes.length)
        var randomWord = Superheroes[randomIndex];

        computerWord = new Word(randomWord);

        requiredNewWord = false;
    }

    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    if (wordComplete.includes(false)) {
        inquirer.prompt([{
            type: "input",
            message: 'select a letter from A to Z',
            name: "userinput"
        }]).then(function (input) {
            if (
                !letterArray.includes(input.userinput) ||
                input.userinput.length > 1
            ) {
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
                    var wordCheckArr = [];

                    computerWord.userGuess(input.userinput);
                    computerWord.array.forEach(wordCheck);
                    if (wordCheckArr.join("") === wordComplete.join("")) {
                        console.log("\nIncorrect!\n");

                        incorretLetters.push(input.userinput);
                        guessLeft--;

                    } else {
                        console.log("\nCorrect!\n");
                        correctLetters.push(input.userinput);
                    }
                    computerWord.log();

                    console.log("Guesses Left:" + guessLeft + "\n");
                    console.log("Letters Guessed:" + incorretLetters.join(" ") + "\n");

                    if (guessLeft > 0) {
                        gameLogic();

                    } else {
                        console.log("You lose, try again!\n");
                        restartGame();
                    }

                    function wordCheck(key) {
                        wordCheckArray.push(key.guessed);
                    }
                }
            }
        });
    } else {
        console.log("You win!\n");
        restartGame();

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