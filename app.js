let card = document.querySelectorAll('.card')
let playAgain = document.querySelector('input')
let firstCard;
let secondCard;
let hasFlippedCard = false;

function flipCard() {
    this.classList.add('card-flipped')
    let cardFlipped = document.querySelectorAll('.card-flipped')
    if (card.length === cardFlipped.length) {
        playAgain.style.display = 'block'
    };
    console.log(cardFlipped)

    if (this === firstCard) return;

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this
        return;
    }    
    secondCard = this;

    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.cardColor === secondCard.dataset.cardColor) {
        disableCards();
        return;
    }
    unflipCards()
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('card-flipped');
        secondCard.classList.remove('card-flipped');
        resetBoard();
    }, 1000);
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function resetBoard() {
    hasFlippedCard = false;
    firstCard = null;
    secondCard = null;
}

function shuffle() {
    card.forEach(item => {
        item.classList.remove('card-flipped');
        item.addEventListener('click', flipCard);

        setTimeout(() => item.style.order = Math.floor(Math.random() * 16), 1000)
    });
}

card.forEach(item => item.addEventListener('click', flipCard, ));
playAgain.addEventListener('click', () => {
    playAgain.style.display = 'none';
    shuffle()
});
window.onload = shuffle;
