// Create a car object
export class Card {
    constructor(name, suit, value) {
        this.name = name;
        this.suit = suit;
        this.value = value;
    }

    createElement () {
        let img = document.createElement('img');
        img.src = `images/${this.suit}-${this.name}.svg`;
        img.classList.add('card', 'generated');
        return img;
    }
}

// Create a deck class
export class Deck {
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
    
    multiply () {
        this.deck = [...this.deck, ...this.deck, ...this.deck];
    }

    shuffle () {
        this.deck = this.deck.sort((a, b) => 0.5 - Math.random())
    }


    deal (card) {
        // let card = this.deck.pop();
        return card.createElement();
    }

    cardsLeft () {
        return this.deck.length
    }

    flippeCard  () {
        let card = document.createElement('img');
        card.src = 'images/blue.svg';
        card.id = 'flippedCard';
        card.classList.add('card', 'generated')
        return card;
    }
}


// Create Player class
export class Player {
    constructor (money) {
        this.hand = [];
        this.spaces = ['player-3', 'player-4', 'player-5', 'player-6']
        this.cash = money
    }

    addMoney (money) {
        this.cash += money;
    }

    subtractMoney (money) {
        this.cash -= money;
    }

    // hasBetterHand (opp) {
    //     let myHand = this.hand.reduce((acc, card) => acc + card.value, 0)
    //     let opponentHand = opp.hand.reduce((acc, card) => acc + card.value, 0)
    //     return myHand > opponentHand;
    // }

    busted () {
        return this.hand.reduce((acc, card) => acc + card.value, 0) > 21
    }

    hit (card) {
        this.hand.push(card)
        document.getElementById('player-info').innerText = this.total()
    }

    total () {
        return this.hand.reduce((acc, card) => acc + card.value, 0)
    }

    clearHand () {
        this.hand = [];
    }

}


// Create dealer class

export class Dealer extends Player {
    constructor (name) {
        super(name)
        this.spaces = ['dealer-3', 'dealer-4', 'dealer-5', 'dealer-6']
    }

    showHiddenCard () {
        let child = document.getElementById('flippedCard')
        document.getElementById('dealer-1').removeChild(child)
        document.getElementById('dealer-1').appendChild(this.hand[0].createElement())
    }

    hit (card) {
        this.hand.push(card)
    }
}

