function Letter(letter) {
    this.placeholder = " ___ "
    this.letter = String(letter).toUpperCase()
    this.isGuessed = false

}

Letter.prototype.getLetter = function () {
    return this.letter
}

Letter.prototype.guessLetter = function (letter) {
    if (!this.isGuessed) {
        this.isGuessed = letter === this.letter
    }
}

module.exports = {
    Letter: Letter
}