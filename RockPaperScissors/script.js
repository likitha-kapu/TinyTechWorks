const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreElem = document.getElementById("playerscore");
const computerScoreElem = document.getElementById("computerscore");

let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result = "";

    if (playerChoice === computerChoice) {
        result = "IT'S A TIE!";
    } else {
        switch (playerChoice) {
            case "rock":
                result = computerChoice === "scissors" ? "YOU WIN!" : "YOU LOOSE!";
                break;
            case "paper":
                result = computerChoice === "rock" ? "YOU WIN!" : "YOU LOOSE!";
                break;
            case "scissors":
                result = computerChoice === "paper" ? "YOU WIN!" : "YOU LOOSE!";
                break;
        }
    }

    if (result === "YOU WIN!") playerScore++;
    if (result === "YOU LOOSE!") computerScore++;

    playerDisplay.textContent = `PLAYER: ${playerChoice}`;
    computerDisplay.textContent = `COMPUTER: ${computerChoice}`;
    resultDisplay.textContent = result;

    playerScoreElem.textContent = `Player Score: ${playerScore}`;
    computerScoreElem.textContent = `Computer Score: ${computerScore}`;

    resultDisplay.classList.remove("greenText", "redText");
    if (result === "YOU WIN!") resultDisplay.classList.add("greenText");
    if (result === "YOU LOOSE!") resultDisplay.classList.add("redText");
}
