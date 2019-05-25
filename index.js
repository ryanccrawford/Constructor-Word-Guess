const word = require('./word')
const inquirer = require('inquirer')
const RandomWord = require('random-word')
const Player = require('./player')
const Quest = require('./questions')
let questions = Quest.questions.questions
let playagain = Quest.questions.playagain
let Word = word.Word
let gameWord = null
let player = Player

function initGame() {
    player.resetLettersGuessed()
    var rword = RandomWord()
    gameWord = new Word(rword)
}


initGame()
startGame()


function startGame() {
    displayWord()
    if (player.guesses > 0 && gameWord.lettersLeft() > 0) {

        inquirer.prompt(questions).then(function (answers) {
            console.log(answers)
            var playerGuess = String(answers.guess).toUpperCase()
            var isCorrect = gameWord.guess(playerGuess)
            if (!isCorrect) {
                player.guessedLetters.push(playerGuess)
                player.guesses--
            } else {
                player.guessedLetters.push(playerGuess)

            }


            startGame();
        })


    } else {
        if (player.checkResults()) {
            player.wins++
            player.guesses = player.guesses + 4
            console.log('You Got it!')
            console.log('You get a bounus of 4 guesses.')
            console.log(`You now have a total of ${player.guesses} guesses.`)
            inquirer.prompt(playagain, function (response) {
                if (response.playAgain) {
                    initGame()
                    startGame()
                } else {
                    endGame()
                }
            })
        } else {
            console.log("Sorry, the word was " + String(gameWord.word).toUpperCase())
            player.looses++
            endGame()
        }


    }

}

function endGame() {
    console.log("")
    console.log("Leaving Game, Good Bye")
    process.exit(0)
}

function displayWord() {
    console.clear()
    console.log(`Score: Wins ${player.wins} | Loses ${player.looses}`)
    console.log('')
    console.log(gameWord.toString())
    console.log('')
    console.log(`Guesses Left: ${player.guesses}`)
    console.log(`Letters Left to Guess: ${gameWord.lettersLeft()}`)
    console.log(`Letters you have used ${player.toString()}`)
}