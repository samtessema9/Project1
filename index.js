// Create a car object
class Card {
    constructor(name, suit, value) {
        this.name = name;
        this.value = value;
        this.suit = suit;
    }

    createElement () {
        let img = document.createElement('img');
        img.src = `images/${this.suit}-${this.name}.svg`;
        img.className = 'card';
        return img;
    }
}


// Create a deck class
class Deck {
    constructor () {
        const names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const suits = ['spades', 'clubs', 'diamonds', 'hearts'];
        this.deck = [];
        for (let name of names) {
            for (let suit of suits) {
                if (parseInt(name)) {
                    this.deck.push(new Card(name, suit, parseInt(name)))
                } else if (name == 'A') {
                    this.deck.push(new Card(name, suit, 11))
                } else {
                    this.deck.push(new Card(name, suit, 10))
                }
            }
        }
        
    }

    // shuffle () {
    //     const shuffledArray = this.deck.sort((a, b) => 0.5 - Math.random());
    // }

    // deal () {

    // }

    showDeck () {
        console.log(this.deck)
    }

}

// let img = document.createElement('img');
// img.src = "images/clubs-r09.svg"
// img.className = 'card'

// document.getElementById('div2').appendChild(img)

let deck = new Deck()

deck.showDeck()