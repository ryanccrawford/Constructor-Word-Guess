var object = {
    questions: [{
        type: 'input',
        name: 'guess',
        message: "Choose a Letter:",
        validate: function (value) {
            var pass = value.match(
                /[a-z]{1}/i
            );
            if (pass) {
                value = String(value).toUpperCase()
                if (player.hasGuessed(value)) {
                    return 'You have already picked ' + value
                }

                return true;
            }

            return 'Please enter only 1 letter a - z';
        }

    }],
    playagain: [{
        type: 'list',
        name: 'playAgain',
        message: "Play Again?",
        choices: [{
            'Yes': true
        }, {
            'No': false
        }]
    }]
}

module.exports = {
    questions: object
}