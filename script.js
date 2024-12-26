const cards = ['🐶', '🐶', '🐱', '🐱', '🐻', '🐻', '🐸', '🐸'];
let firstCard = null;
let secondCard = null;
let matchedPairs = 0;

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create the board
function createBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = ''; // Clear the board
  matchedPairs = 0;
  firstCard = null;
  secondCard = null;

  const shuffledCards = shuffle([...cards]);

  for (const emoji of shuffledCards) {
    const card = document.createElement('div');
    card.classList.add('card', 'hidden');
    card.dataset.emoji = emoji;
    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
  }
}

// Flip the card
function flipCard(card) {
  if (card === firstCard || card.classList.contains('matched')) return;

  card.classList.remove('hidden');
  card.textContent = card.dataset.emoji;

  if (firstCard == undefined) {
    firstCard = card;
  } else {
    secondCard = card;
    checkMatch();
  }
}

// Check for a match
function checkMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;
    resetSelection();

    if (matchedPairs === cards.length / 2) {
      setTimeout(() => alert('You win!'), 500);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.add('hidden');
      secondCard.classList.add('hidden');
      firstCard.textContent = '';
      secondCard.textContent = '';
      resetSelection();
    }, 1000);
  }
}

// Reset the selected cards
function resetSelection() {
  firstCard = null;
  secondCard = null;
}

// Restart button functionality
document.getElementById('restart').addEventListener('click', createBoard);

// Initialize the board on page load
createBoard();
