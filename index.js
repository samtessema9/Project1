// Create a car object
class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }

    display () {

    }
}


// Create a deck class
class Deck {
    constructor () {
        const values = [];
        const suits = ['spades', 'clubs', 'diamonds', 'hearts'];
        const deck = [];
    }

    shuffle () {
        const shuffledArray = this.deck.sort((a, b) => 0.5 - Math.random());
    }

    deal () {

    }


}

let img = document.createElement('img');
img.src = "clubs-r09.svg"
img.className = 'card'

document.getElementById('player').appendChild(img)