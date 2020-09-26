var tryAgainButton = document.getElementById('try-again');
var logs = document.getElementById('logs');

function loadGame() {
  addToLog('Website', 'How many games do you want');
  var gameStr = prompt('How many games do you want');
  var gameCount = parseInt(gameStr);
  addToLog('Input', gameCount);
  if (Number.isNaN(gameCount)) {
    addToLog('Website', 'Invalid input');
    alert('Invalid input');
    loadGame();
  }

  var userScore = 0;
  var drawScore = 0;
  var cpuScore = 0;

  for (var i = 0; i < gameCount; i++) {
    addToLog('Website', 'Choose Rock, paper, scissors');
    var userChoice = isValidUserChoice(prompt('Choose Rock, paper, scissors'));
    addToLog('Input', userChoice);

    var cpuChoice = generateChoice();
  
    if (hasWon(userChoice, cpuChoice)) {
      userScore++;
      addToLog('Website', `WON: You chose: ${userChoice}, CPU chose: ${cpuChoice}`);
      alert(`WON: You chose: ${userChoice}, CPU chose: ${cpuChoice}`);
    } else if (userChoice === cpuChoice) {
      drawScore++;
      addToLog('Website', `DRAW: You chose: ${userChoice}, CPU chose: ${cpuChoice}`);
      alert(`DRAW: You chose: ${userChoice}, CPU chose: ${cpuChoice}`);
    } else {      
      cpuScore++;
      addToLog('Website', `LOST: You chose: ${userChoice}, CPU chose: ${cpuChoice}`);
      alert(`LOST: You chose: ${userChoice}, CPU chose: ${cpuChoice}`);
    }
    addToLog('Website', `${i + 1} round`);
  }
  addToLog('Website', `${generateResult(userScore, cpuScore)}: Your score: ${userScore}, CPU score: ${cpuScore}, Draw score: ${drawScore}`);
  alert(`${generateResult(userScore, cpuScore)}: Your score: ${userScore}, CPU score: ${cpuScore}, Draw score: ${drawScore}`);
}

function generateResult(score1, score2) {
  if (score1 === score2) {
    return 'DRAW';
  } else if (score1 > score2) {
    return 'WON';
  } else {
    return 'LOST';
  }
}

function isValidUserChoice(value) {
  if (value) {
    var choice = value.toLowerCase();
    if (choice === 'rock' || choice === 'paper' || choice === 'scissors') {
      return choice;
    }
    addToLog('Website', 'Invalid please choose: Rock, paper, scissors');
    return isValidUserChoice(prompt('Invalid please choose: Rock, paper, scissors'));
  }
  addToLog('Website', 'Invalid please choose: Rock, paper, scissors');
  return isValidUserChoice(prompt('Invalid please choose: Rock, paper, scissors'));
}

function generateChoice() {
  var choices = ['rock', 'paper', 'scissors'];
  var randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function hasWon(choice1, choice2) {
  if (
    (choice1 === 'rock' && choice2 === 'scissors') ||
    (choice1 === 'paper' && choice2 === 'rock') ||
    (choice1 === 'scissors' && choice2 === 'paper')
  ) {
    return true;
  }
  return false;
}

function addToLog(issuer, data) {
  var logContainer = document.createElement('div');
  var logName = document.createElement('p');
  logName.innerText = `${issuer}: ${data}`;
  logContainer.appendChild(logName);
  logs.appendChild(logContainer);
}

tryAgainButton.addEventListener('click', function() {
  loadGame();
});

document.addEventListener('DOMContentLoaded', function() {
  loadGame();
});
