// require lodash
// const _ = require('lodash');




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
        img.classList.add('card', 'generated');
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
        card.classList.add('card', 'generated')
        return card;
    }
}


const dealInitial = (deck) => {
    deck.shuffle()
    let playerCards = [];
    let dealerCards = [];

    let faceDownCard = deck.deck.pop()
    dealerCards.push(faceDownCard)
    let d1 = document.getElementById('dealer-1')
    // d1.innerHTML = ''
    d1.appendChild(deck.flippeCard())
    
    let playerCard1 = deck.deck.pop()
    playerCards.push(playerCard1)
    let p1 = document.getElementById('player-1')
    // p1.innerHTML = ''
    p1.appendChild(deck.deal(playerCard1))
    
    let dealerCard2 = deck.deck.pop()
    dealerCards.push(dealerCard2)
    let d2 = document.getElementById('dealer-2')
    // d2.innerHTML = ''
    d2.appendChild(deck.deal(dealerCard2))

    let playerCard2 = deck.deck.pop()
    playerCards.push(playerCard2)
    let p2 = document.getElementById('player-2')
    // p2.innerHTML = ''
    p2.appendChild(deck.deal(playerCard2))

    return {dealerCards: dealerCards, 
            playerCards: playerCards
        }
}


// let func = dealInitial(new Deck())

// console.log(func.dealerCards)

// let dealertotal = func.dealerCards.reduce((acc, card) => acc + card.value, 0)

// console.log('dealertotal: ', dealertotal)

// let playertotal = 0
// for (let card of func.playerCards) {
//     playertotal += card.value
// }
// console.log('player total: ',playertotal)


const runGame = () => {
    const deck = new Deck();
    let playerDivs = ['player-3', 'player-4', 'player-5']
    let playerPointer = 0
    let dealerDivs = ['dealer-3', 'dealer-4', 'dealer-5']
    let dealerPointer = 0
    let init = dealInitial(deck)

    const resetGame = () => {
        let generated = document.querySelectorAll('.generated')
        console.log(generated)
        for (let element of generated) {
            element.remove()
        }

        let buttons = document.getElementsByClassName('button');
        console.log(buttons)
        for (let button of buttons) {
            button.disabled = false;
        //     if (button.className.includes('hit-button')) {
        //         button.removeEventListener('click', rem)
        //     }
        }
        document.getElementById('output').innerText = ``        
    }

    let dealertotal = init.dealerCards.reduce((acc, card) => acc + card.value, 0)
    console.log('dealertotal: ', dealertotal)

    let playertotal = init.playerCards.reduce((acc, card) => acc + card.value, 0)
    console.log('playertotal: ', playertotal)

    let hit = document.getElementById('hit-button')
    hit.addEventListener('click', function rem (e) {
        let card = deck.deck.pop()
        // init.playerCards.push(card)
        document.getElementById(playerDivs[playerPointer]).appendChild(deck.deal(card))
        playerPointer++
        playertotal += card.value;
        console.log('playertotal: ', playertotal)
        if (playertotal >= 21) {
            e.target.disabled = true;
            document.getElementById('output').innerText = `Dealer wins!!`
            // runGame()
            setTimeout(resetGame, 2000)
            
            setTimeout(runGame, 3000)
            console.log('dealer wins')
        }
    })

    let stay = document.getElementById('stay-button')
    stay.addEventListener('click', (e) => {
        hit.disabled = true;
        console.log(hit)
        e.target.disabled = true;
        // handleStay()
    })
}

runGame()



// while (true) {
//     if (dealerWins) {
//         alert('dealer wins')
//         break
//     } 
// }