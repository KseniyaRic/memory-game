const header = document.createElement('header');

const GameName = document.createElement ('h1')
GameName.textContent = 'Memory Game';
header.appendChild(GameName)

const headerButtons = document.createElement('div');
headerButtons.classList.add('headerButtons');
header.appendChild(headerButtons)

const newGameBtn = document.createElement('button');
newGameBtn.textContent = 'New Game';
headerButtons.appendChild(newGameBtn);

const leaderBtn = document.createElement('button');
leaderBtn.textContent = 'Leaders';
headerButtons.appendChild(leaderBtn);

const scoreDiv = document.createElement('div');
scoreDiv.classList.add('score');

const movesSpan = document.createElement('span');
movesSpan.textContent = 'Steps: 0';
scoreDiv.appendChild(movesSpan);

const pairsSpan = document.createElement('span');
pairsSpan.textContent = 'Pairs Matched: 0 | 8';
scoreDiv.appendChild(pairsSpan);

header.appendChild(scoreDiv);

const main = document.createElement('main');
const gameBoard = document.createElement('div');
gameBoard.classList.add('game-board');

main.appendChild(gameBoard);

document.body.appendChild(header);
document.body.appendChild(main);

const images = [
'img/cat.jpg',
'img/dog.jpg',
'img/dog2.jpg',
'img/fish.jpg',
'img/hourse.jpg',
'img/monkey.jpg',
'img/mouse.jpg',
'img/sad.jpg',
];

let cards = [...images,...images];


