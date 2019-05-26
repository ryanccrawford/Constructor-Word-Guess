const word = require('./word')
const inquirer = require('inquirer')
const RandomWord = require('random-word')
var questions = [{
        type: 'input',
        name: 'guess',
        message: "Choose a Letter:",
        validate: function (value) {
            var pass = value.match(
                /[a-z]{1}/i
            );
            if (value.length > 1) {
                return 'Please only enter 1 character at a time.'
            }
            if (pass) {
                return true
            }

            return 'Please enter only 1 letter a - z'
        }

}]
var playagain = {
        type: 'list',
        name: 'playAgain',
        message: "Play Again?",
    choices: ['Yes','No']
}
var startGame = [{
    type: 'list',
    name: 'level',
    message: "Select difficulty level (0 - 5) Default = 2",
    choices: [0, 1, 2, 3, 4, 5],
    default: 2
}, {
    type: 'list',
    name: 'guesses',
    message: "Number of guesses (4 - 10) Default = 6",
        choices: [4, 5, 6, 7, 8, 9, 10],
    default: 2
}
]
var player = {
    level: 0,
    guesses: 0,
    biggestWord: 0,
    guessedLetters: [],
    toString: function () {
        return this.guessedLetters.join(" ")
    },
    hasGuessed: function (letter) {

        return Array(this.guessedLetters).includes(String(letter).toUpperCase(), 0)
    },
    wins: 0,
    looses: 0,
    checkResults: function (WordObj) {
        if (WordObj.isGuessed) {
            return true
        }
        return false
    },
    resetLettersGuessed: function () {
        this.guessedLetters = null
        this.guessedLetters = []
    }
}
let Word = word.Word
let gameWord = {}

gameOptions()

function gameOptions() {
    console.clear()
      inquirer.prompt(startGame).then(function (response) {
          player.biggestWord = response.level + 6 
          player.level = response.level
          player.guesses = response.guesses
        initGame()

      })
}
function getWord(maxLetters) {
    var word = ''
    while (word.length < 4 && word.length > player.biggestWord) {
        word = RandomWord()
    }
     return word
}
function initGame() {
    console.clear()
    gameWord = {}
    player.resetLettersGuessed()
    var rword = getWord(player.biggestWord)
    gameWord = new Word(rword)
    startGame("Welcome to the game!")
}

function startGame(message = '') {
    displayWord(message)
   var playerMessage = message
    if (player.guesses > 0 && gameWord.lettersLeft() > 0) {
        playerMessage = ''
        inquirer.prompt(questions).then(function (answers) {
         
            var playerGuess = String(answers.guess).toUpperCase()
            if (playerGuess.length > 1) {
                message = "Entered too many letters. Enter just one letter"
            } else {
        
                if (player.hasGuessed(playerGuess)) {
                
                    playerMessage = 'You have already picked ' + playerGuess
               
                } else {
                    var isCorrect = gameWord.guess(playerGuess)
                    if (!isCorrect) {
                        player.guessedLetters.push(playerGuess)
                        player.guesses--
                        playerMessage = 'Nope sorry no ' + playerGuess;
                    } else if (isCorrect) {
                        player.guessedLetters.push(playerGuess)
                        playerMessage = 'Nice! The letter ' + playerGuess + ' was found'
                    }
                }
            }
            startGame(playerMessage)
        })


    } else {
        if (player.checkResults(gameWord)) {
            player.wins++
            player.guesses += 4
            console.log('You Got it!')
            console.log('You get a bounus of 4 guesses.')
            console.log(`You now have a total of ${player.guesses} guesses.`)
            
            inquirer.prompt(playagain).then(function (response) {
                if (response.playAgain === "Yes") {
                    initGame()
                    
                } else {
                    endGame()
                }
            })
        } else {
            console.log("Sorry, the word was " + String(gameWord.word).toUpperCase())
            player.looses++
            player.guesses = 4
             inquirer.prompt(playagain).then(function (response) {
                 if (response.playAgain === "Yes") {
                     initGame()

                 } else {
                     endGame()
                 }
             })
        }


    }

}

function endGame() {
    console.log("")
    console.log("Leaving Game, Good Bye")
    process.exit(0)
}

function displayWord(_message) {
    console.clear()
    console.log(gameWord.word)
    console.log(`Score: Wins ${player.wins} | Loses ${player.looses}`)
    console.log('')
    console.log(gameWord.toString())
    console.log('')
    console.log(`Guesses Left: ${player.guesses}`)
    console.log(`Letters Left to Guess: ${gameWord.lettersLeft()}`)
    console.log(`Letters you have used ${player.toString()}`)
    if (_message) {
        console.log(_message)
        console.log('')
    } else {
        console.log('')
    }
   
}