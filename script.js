// Глобальные переменные состояния
let hasFlippedCard = false;
let lockBoard = false;
let firstCard = null;
let secondCard = null;

let moves = 0;
let matchedPairs = 0;

let timeoutId = null;

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

function initGame() {
while (gameBoard.firstChild) {
gameBoard.removeChild(gameBoard.firstChild);
}

function shuffle(array) {
let i =array.length, j, k;
while (i) {
k = Math.floor(Math.random() * i--);
j = array[i];
array[i] = array[k];
array[k] = j;
}
return array
}

shuffle(cards);

cards.forEach(function(imagePath) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    cardElement.dataset.img = imagePath;

    const cardImg = document.createElement('img');
    cardImg.src = imagePath;
    cardImg.classList.add('card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    cardElement.appendChild(cardImg);
    cardElement.appendChild(cardBack);

    cardElement.addEventListener('click', flipCard);

    gameBoard.appendChild(cardElement);
});
}

function restartGame() {
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }

    moves = 0;
    matchedPairs = 0;
    resetBoard();

    movesSpan.textContent = 'Steps: 0';
    pairsSpan.textContent = 'Pairs Matched: 0 | 8';

        initGame();
}

newGameBtn.addEventListener('click', restartGame);

initGame();

function flipCard() {
    if (lockBoard) return;

    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;

    checkForMatch();
}
    function checkForMatch() {

        let isMatch = firstCard.dataset.img === secondCard.dataset.img;

    moves++;
    movesSpan.textContent = `Steps: ${moves}`;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchedPairs++;
    pairsSpan.textContent = `Pairs Matched: ${matchedPairs} | 8`;

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    timeOutId = setTimeout(() => {
        if (firstCard && secondCard) {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        }

        resetBoard();
        timeoutId = null;
    }, 1200);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}