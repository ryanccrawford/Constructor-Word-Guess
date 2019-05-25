const letter = require('letter')

function Word(newWord) {
    this.word = newWord
    this.wordArray = this.createWordArray()
    this.letters = this.createLetters()
    
}
Word.prototype.createWordArray = function () {
    return this.word.split("")
}
Word.prototype.createLetters = function () {
    var tempLetters = []
    this.wordArray.array.forEach(_letter => {
        var letterObj = new letter(_letter)
        tempLetters.push(letterObj)
    });
    return tempLetters

}
Word.prototype.length = Word.word.length

Word.prototype.lettersLeft = function () {
   var placesLeft = 0
    this.letters.forEach(function (l) {
        if (!l.isGuessed) {
            placesLeft++
        }
    })
    return placesLeft
}
Word.prototype.toString = function () {
    var tempWordString = ''
    var count = this.letters.length
    for (let i = 0; i < count; i++){
        if (this.letters[i].isGuessed) {
            tempWordString += this.letters[i].getLetter()
        } else {
            tempWordString += this.letters[i].placeholder
        }
    }
          return tempWordString
}

Word.prototype.guess = function (_letter) {
    var  points = 0
    this.letters.forEach(function (l) {
        l.guessLetter(_letter)
        if (l.isGuessed()) {
            points++
        }
    })
    return points !== 0 ? true : false
}

exports.word = {
    Word
}