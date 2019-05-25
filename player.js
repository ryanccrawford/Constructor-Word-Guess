var player = {
    guesses: 4,
    guessedLetters: [],
    toString: function () {
        return this.guessedLetters.join(" ")
    },
    hasGuessed: function (letter) {
        return Array(this.guessedLetters).includes(letter)
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
        this.guessedLetters = []
    }

}

module.exports = player