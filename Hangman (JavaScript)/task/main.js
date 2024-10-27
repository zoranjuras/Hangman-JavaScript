const input = require('sync-input')

const targets = ["python", "java", "swift", "javascript"];
let won = 0;
let lost = 0;

replace = (hintedTarget, target, guessedLetter) => {
    for (let i = 0; i < target.length; i++) {
        if (target[i] === guessedLetter) {
            hintedTarget = hintedTarget.substring(0, i) + guessedLetter + hintedTarget.substring(i + 1);
        }
    }
    return hintedTarget;
}

function showResults() {
    console.log(`You won: ${won} times.\nYou lost: ${lost} times.`);
}

console.log("H A N G M A N");

while (true) {
    let choice = input("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit: ");
    if (choice === "play") {
        game();
    } else if (choice === "exit") {
        process.exit();
    } else if (choice === "results") {
        showResults();
    } else {
        console.log("Invalid command.");
    }
}

function game() {
    let target = targets[Math.floor(Math.random() * targets.length)];

    let guessedLetters = [];

    let hintedTarget = target.replace(/./g, '-');

    let tries = 8;

    let guessedLetter = "";

    let finalMessage = "You lost!";

    while (tries > 0) {
        if (hintedTarget === target) {
            finalMessage = `You guessed the word ${target}!\nYou survived!`;
            won++;
            break;
        }

        while (true) {
            console.log("\n" + hintedTarget);
            guessedLetter = input("Input a letter: ");
            if (guessedLetter.length !== 1) {
                console.log("Please, input a single letter.");
            } else if (!/[a-z]/.test(guessedLetter)) {
                console.log("Please, enter a lowercase letter from the English alphabet.");
            } else {
                break;
            }
        }

        if (guessedLetters.includes(guessedLetter)) {
            console.log("You've already guessed this letter.");
        } else if (target.includes(guessedLetter)) {
            hintedTarget = replace(hintedTarget, target, guessedLetter);
            guessedLetters.push(guessedLetter);
        } else {
            console.log("That letter doesn't appear in the word.");
            guessedLetters.push(guessedLetter);
            tries--;
        }

        if (tries === 0) {
            lost++;
        }
    }
    console.log(finalMessage);
}
