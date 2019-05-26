const letter = require('./letter')
let Letter = letter.Letter

function Word(newWord) {
    this.word = newWord
    this.wordArray = this.createWordArray()
    this.letters = this.createLetters()
    this.length = this.letters.length
    this.isGuessed = false

}
Word.prototype.createWordArray = function () {
    return this.word.split("")
}
Word.prototype.createLetters = function () {
    var tempLetters = []
    this.wordArray.forEach(_letter => {

        var letterObj = new Letter(_letter)
        tempLetters.push(letterObj)
    });
    return tempLetters

}

Word.prototype.lettersLeft = function () {
    var placesLeft = 0
    this.letters.forEach(function (l) {
        if (!l.isGuessed) {
            placesLeft++
        }
    })
    if (!placesLeft) {
        this.isGuessed = true
    }
    return placesLeft
}
Word.prototype.toString = function () {
    var tempWordString = ''
    var count = this.letters.length
    for (let i = 0; i < count; i++) {
        if (this.letters[i].isGuessed) {
            tempWordString += " _" + this.letters[i].getLetter() + "_ "
        } else {
            tempWordString += this.letters[i].placeholder
        }
    }
    return tempWordString
}

Word.prototype.guess = function (_letter) {
    var points = 0
    this.letters.forEach(function (l) {
        if (l.isGuessed) {
            return;
        }
        l.guessLetter(_letter)

        if (l.isGuessed) {
            points++
        }
    })
    return points
}

module.exports = {
    Word: Word
}