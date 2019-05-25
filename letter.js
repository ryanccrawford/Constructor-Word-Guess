function Letter(letter) {
    this.placeholder = "_"
    this.letter = letter
    this.isGuessed = false

}

Letter.prototype.getLetter = function(){
    return this.letter
}

Letter.prototype.guessLetter = function (letter) {
    this.isGuessed = letter === this.letter
}

exports.letter = {
    Letter
}