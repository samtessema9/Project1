import {Card, Deck, Player, Dealer} from './classes.js'

const dealInitial = (deck, player, dealer) => {
    // shuffle the deck that's passed in
    deck.shuffle()
    // get a card from the top of the deck and add it to the dealers hand
    // display a facedown card
    let faceDownCard = deck.deck.pop()
    dealer.hit(faceDownCard)
    let d1 = document.getElementById('dealer-1')
    d1.innerHTML = ''
    d1.appendChild(deck.flippeCard())
    
    // get a card from the top of the deck and add it to the players hand and display it on the screen
    let playerCard1 = deck.deck.pop()
    player.hit(playerCard1)
    let p1 = document.getElementById('player-1')
    p1.innerHTML = ''
    p1.appendChild(deck.deal(playerCard1))
    
    // get a card from the top of the deck and add it to the dealers hand and display it on screen
    let dealerCard2 = deck.deck.pop()
    dealer.hit(dealerCard2)
    let d2 = document.getElementById('dealer-2')
    d2.innerHTML = ''
    d2.appendChild(deck.deal(dealerCard2))

    // get a card from the top of the deck and add it to the players hand and display it on the screen
    let playerCard2 = deck.deck.pop()
    player.hit(playerCard2)
    let p2 = document.getElementById('player-2')
    p2.innerHTML = ''
    p2.appendChild(deck.deal(playerCard2))

}


const runGame = (deck, player, dealer) => {

    // deals the first two cards for the dealer and player and updates those objects
    dealInitial(deck, player, dealer)

    // select the buttons and output box
    let hitButton = document.getElementById('hit-button')
    let stayButton = document.getElementById('stay-button')
    let outPut = document.getElementById('output')
    // initialize pointers for the hit functionality
    let dealerPointer = 0
    let playerPointer = 0

    // check if either player or dealer has black jack and reset the game if so
    if (player.total() == 21) {
        outPut.innerText = 'Blackjack!!!'
        setTimeout(resetGame, 2000)
    } else if (dealer.total() == 21) {
        outPut.innerText = 'Dealer Blackjack :('
        setTimeout(resetGame, 2000)
    }

    // reset game function
    const resetGame = () => {
        // clear all generated cards from screen
        let generated = document.querySelectorAll('.generated')
        for (let element of generated) {
            element.remove()
        }

        // enable all the buttons
        let buttons = document.querySelectorAll('.button')
        for (let element of buttons) {
            element.disabled = false;
        }
        
        // clear the output box
        outPut.innerText = ''

        // remove eventListeners form the buttons
        hitButton.removeEventListener('click', handleHit)
        stayButton.removeEventListener('click', handleStay)

        // clear the player and dealers hands
        player.clearHand()
        dealer.clearHand()

        // start the game over
        runGame(deck, player, dealer)
    }

    const handleHit = (e) => {
        // get a card from the top of the deck - append the card to the players hand - display the card on the screen
        let card = deck.deck.pop()
        player.hit(card)
        document.getElementById(player.spaces[playerPointer]).appendChild(deck.deal(card))
    
        // handle player bust / blackjack. else increase pointer for where the next card will be placed
        if (player.total() > 21) {
            e.target.disabled = true;
            stayButton.disabled = true;
            outPut.innerText = 'You busted!!!'
            setTimeout(resetGame, 2000) 
        } else if (player.total() == 21) {
            stayButton.disabled = true;
            outPut.innerText = 'Thats 21 You win!!'
            setTimeout(resetGame, 2000)
        } else {
            playerPointer++
        }
    
    }
    
    const handleStay = (e) => {
        // disable all the buttons and show the dealers facedown card
        hitButton.disabled = true;
        e.target.disabled = true;
        dealer.showHiddenCard()

        // if the dealer has a 17 or higher compare dealers total to players total and announce the winner or a tie 
        // reset the game
        if (dealer.total() > 16) {
            if (player.total() > dealer.total()) {
                outPut.innerText = 'You win!!!'
                setTimeout(resetGame, 2000)            
            } else if (dealer.total() > player.total()) {
                outPut.innerText = 'House wins :('
                setTimeout(resetGame, 2000)            
            } else {
                outPut.innerText = 'Its a tie.'
                setTimeout(resetGame, 2000)            
            }

        } else {
            // while the dealer has less than 17 hit the dealer and increment pointer for the dealers next card
            while (dealer.total() < 17) {
                let card = deck.deck.pop()
                dealer.hit(card)
                document.getElementById(dealer.spaces[dealerPointer]).appendChild(deck.deal(card))
                dealerPointer++
            }
            // if dealer busts announce player wins and reset the game
            if (dealer.total() > 21) {
                outPut.innerText = 'Dealer busts you win!!!'
                setTimeout(resetGame, 2000)            
            } else {
                // compare the dealers tota to the players total and announce the winner or a tie
                if (player.total() > dealer.total()) {
                    outPut.innerText = 'You win!!!'
                    setTimeout(resetGame, 2000)                
                } else if (dealer.total() > player.total()) {
                    outPut.innerText = 'House wins :('
                    setTimeout(resetGame, 2000)                
                } else {
                    outPut.innerText = 'Its a tie.'
                    setTimeout(resetGame, 2000)                
                }
            }
        }
    }

    // add the handleHit function to the hit button
    hitButton.addEventListener('click', handleHit)
    // add the handleStay function to the stay button
    stayButton.addEventListener('click', handleStay)

}

// initialize new player object
let player = new Player()
// initialize new dealer object
let dealer = new Dealer()
// initialize new deck object
let gameDeck = new Deck()

// call runGame with the above three objects as params
runGame(gameDeck, player, dealer)