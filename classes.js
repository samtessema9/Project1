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

    static cardCount = 0;

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
        this.deck = [...this.deck, ...this.deck, ...this.deck, ...this.deck, ...this.deck, ...this.deck];
    }

    shuffle () {
        this.deck = this.deck.sort((a, b) => 0.5 - Math.random())
    }


    deal (card) {
        if (card.value < 7) Deck.cardCount++;
        else if (card.value > 9) Deck.cardCount--;
        console.log(Deck.cardCount)

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

    busted () {
        return this.total() > 21
    }

    hit (card) {
        this.hand.push(card)
        document.getElementById('player-info').innerText = this.total()
    }

    total () {
        let sum = 0
        for (let card of this.hand) {
            sum += card.value
        }

        if (sum > 21) {
            for (let card of this.hand) {
                if (card.name == 'A') {
                    sum -= 10
                    if (sum < 22) {
                        return sum
                    }
                }
            }
        }
        
        return sum

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
        if (this.hand[0].value < 7) Deck.cardCount++;
        else if (this.hand[0].value > 9) Deck.cardCount--;
        console.log(Deck.cardCount)
    }

    hit (card) {
        this.hand.push(card)
    }
}

