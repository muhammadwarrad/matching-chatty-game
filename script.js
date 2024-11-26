const images = [
  'Chatty.png', 'Chatty.png',
  'chatty4.png', 'chatty4.png',
  'Chatty3.png', 'Chatty3.png',
  'Chatty2.png', 'Chatty2.png',
  'moe.png', 'moe.png',
  'love.png', 'love.png',
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;
let totalClicks = 0;
const totalPairs = images.length / 2;

const gameBoard = document.getElementById('gameBoard');

const shuffledImages = shuffle(images);
shuffledImages.forEach(imageSrc => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.image = imageSrc;

  const img = document.createElement('img');
  img.src = imageSrc;
  card.appendChild(img);

  card.addEventListener('click', flipCard);
  gameBoard.appendChild(card);
});

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add('flipped');
  totalClicks++;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.image === secondCard.dataset.image) {
    disableCards();
    matchesFound++;
    if (matchesFound === totalPairs) setTimeout(showWinMessage, 500);
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function showWinMessage() {
  const winMessage = document.createElement('div');
  winMessage.classList.add('win-message');
  winMessage.innerText = `You won! ${totalClicks} clicks.`;

  const playAgainButton = document.createElement('button');
  playAgainButton.innerText = 'Play Again';
  playAgainButton.addEventListener('click', resetGame);

  const gameContainer = document.querySelector('body');
  gameContainer.appendChild(winMessage);
  gameContainer.appendChild(playAgainButton);
}

function resetGame() {
  const feelingChattyButton = document.getElementById('feelingChattyBtn');
  
  const winMessage = document.querySelector('.win-message');
  const playAgainButton = document.querySelector('button');
  if (winMessage) winMessage.remove();
  if (playAgainButton) playAgainButton.remove();

  gameBoard.innerHTML = '';
  matchesFound = 0;
  totalClicks = 0;
  const reshuffledImages = shuffle(images);
  reshuffledImages.forEach(imageSrc => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = imageSrc;

    const img = document.createElement('img');
    img.src = imageSrc;
    card.appendChild(img);

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });

  gameContainer.appendChild(feelingChattyButton);
}

document.getElementById('feelingChattyBtn').addEventListener('click', function() {
  window.location.href = 'https://x.com/chattyonsolana'; 
});
