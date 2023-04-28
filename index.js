import {Card, Deck, Player, Dealer} from './classes.js'

const dealInitial = async (deck, player, dealer) => {
    // shuffle the deck that's passed in
    deck.shuffle()
    // get a card from the top of the deck and add it to the dealers hand
    // display a facedown card
    setTimeout( () => {
        let faceDownCard = deck.deck.pop()
        dealer.hit(faceDownCard)
        let d1 = document.getElementById('dealer-1')
        d1.innerHTML = ''
        d1.appendChild(deck.flippeCard())
    }, 1000)
    
    // get a card from the top of the deck and add it to the players hand and display it on the screen
    setTimeout( () => {
        let playerCard1 = deck.deck.pop()
        player.hit(playerCard1)
        let p1 = document.getElementById('player-1')
        p1.innerHTML = ''
        p1.appendChild(deck.deal(playerCard1))
    }, 2000)
    
    // get a card from the top of the deck and add it to the dealers hand and display it on screen
    setTimeout( () => {
        let dealerCard2 = deck.deck.pop()
        dealer.hit(dealerCard2)
        let d2 = document.getElementById('dealer-2')
        d2.innerHTML = ''
        d2.appendChild(deck.deal(dealerCard2))
    }, 3000 )

    // get a card from the top of the deck and add it to the players hand and display it on the screen
    setTimeout( () => {
        let playerCard2 = deck.deck.pop()
        player.hit(playerCard2)
        let p2 = document.getElementById('player-2')
        p2.innerHTML = ''
        p2.appendChild(deck.deal(playerCard2))

    }, 4000 )
}


const runGame = async (deck, player, dealer, cash) => {

    document.getElementById('deal-button').disabled = true;

    player.subtractMoney(cash)
    
    document.getElementById('wallet').innerText = `Wallet: ${player.cash}`

    let chips = document.getElementById('chips')
    chips.innerText = cash

    // deals the first two cards for the dealer and player and updates those objects
    await dealInitial(deck, player, dealer)

    // select the buttons and output box
    let hitButton = document.getElementById('hit-button')
    let stayButton = document.getElementById('stay-button')
    let outPut = document.getElementById('output')
    // initialize pointers for the hit functionality
    let dealerPointer = 0
    let playerPointer = 0

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
        
        // clear the output box and the chips
        outPut.innerText = '';
        chips.innerText = '';
        document.getElementById('player-info').innerText = '';

        // remove eventListeners form the buttons
        hitButton.removeEventListener('click', handleHit)
        stayButton.removeEventListener('click', handleStay)

        // clear the player and dealers hands
        player.clearHand()
        dealer.clearHand()

        // start the game over
        document.getElementById('deal-button').disabled = false;
    }

    const playerBlackJack = () => {
        let winnings = (cash * 1.5) + cash
        player.addMoney(winnings)
        chips.innerText = winnings
        document.getElementById('wallet').innerText = `Wallet: ${player.cash}`
    }

    const playerWins = () => {
        let winnings = cash * 2
        player.addMoney(winnings)
        chips.innerText = winnings
        document.getElementById('wallet').innerText = `Wallet: ${player.cash}`
    }

    const handleTie = () => {
        let winnings = cash
        player.addMoney(winnings)
        document.getElementById('wallet').innerText = `Wallet: ${player.cash}`
    }

    const handleLoss = () => {
        chips.innerText = 0
        document.getElementById('wallet').innerText = `Wallet: ${player.cash}`
    }

    const handleHit = (e) => {
        // get a card from the top of the deck - append the card to the players hand - display the card on the screen
        let card = deck.deck.pop()
        player.hit(card)
        document.getElementById(player.spaces[playerPointer]).appendChild(deck.deal(card))
    
        // handle player bust / blackjack. else increase pointer for where the next card will be placed
        if (player.busted()) {
            e.target.disabled = true;
            stayButton.disabled = true;
            outPut.innerText = 'You busted!!!'
            handleLoss()
            setTimeout(resetGame, 2000) 
        } else if (player.total() == 21) {
            e.target.disabled = true;
            stayButton.disabled = true;
            outPut.innerText = 'Thats 21 You win!!'
            playerWins()
            setTimeout(resetGame, 2000)
        } else {
            playerPointer++
        }
    
    }
    
    const handleStay = async (e) => {
        // disable all the buttons and show the dealers facedown card
        hitButton.disabled = true;
        e.target.disabled = true;
        dealer.showHiddenCard()

        // if the dealer has a 17 or higher compare dealers total to players total and announce the winner or a tie 
        // reset the game
        if (dealer.total() > 16) {
            if (player.total() > dealer.total()) {
                outPut.innerText = 'You win!!!'
                playerWins()
                setTimeout(resetGame, 2000)            
            } else if (dealer.total() > player.total()) {
                outPut.innerText = 'House wins :('
                handleLoss()
                setTimeout(resetGame, 2000)            
            } else {
                outPut.innerText = 'Its a tie.'
                handleTie()
                setTimeout(resetGame, 2000)            
            }

        } else {
            // define a function that pauses code execution
            const sleep = (ms) => {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            
            // while the dealer has less than 17 hit the dealer and increment pointer for the dealers next card
            while (dealer.total() < 17) {
                let card = deck.deck.pop()
                dealer.hit(card)
                await sleep(1500)
                document.getElementById(dealer.spaces[dealerPointer]).appendChild(deck.deal(card))
                dealerPointer++
            }
            // if dealer busts announce player wins and reset the game
            if (dealer.busted()) {
                outPut.innerText = 'Dealer busts you win!!!'
                playerWins()
                setTimeout(resetGame, 2000)            
            } else {
                // compare the dealers tota to the players total and announce the winner or a tie
                if (player.total() > dealer.total()) {
                    outPut.innerText = 'You win!!!'
                    playerWins()
                    setTimeout(resetGame, 2000)                
                } else if (dealer.total() > player.total()) {
                    outPut.innerText = 'House wins :('
                    handleLoss()
                    setTimeout(resetGame, 2000)                
                } else {
                    outPut.innerText = 'Its a tie.'
                    handleTie()
                    setTimeout(resetGame, 2000)                
                }
            }
        }
    }

    // check if either player or dealer has black jack and reset the game if so
    setTimeout( () => {
        if (player.total() == 21) {
            outPut.innerText = 'Blackjack!!!'
            playerBlackJack()
            setTimeout(resetGame, 2000)
        } else if (dealer.total() == 21) {
            outPut.innerText = 'Dealer Blackjack :('
            handleLoss()
            setTimeout(resetGame, 2000)
        }
    }, 4500)
    

    // add the handleHit function to the hit button
    setTimeout(() => {
        hitButton.addEventListener('click', handleHit)
    }, 5000)
    
    // add the handleStay function to the stay button
    setTimeout(() => {
        stayButton.addEventListener('click', handleStay)
    }, 5000)
    
    
}

// initialize new player object
let player = new Player(1000)
// initialize new dealer object
let dealer = new Dealer()
// initialize new deck object
let gameDeck = new Deck()
gameDeck.multiply()


let inputBet = document.getElementById('enter-bet')
let dealButton = document.getElementById('deal-button')
let chips = document.getElementById('chips')

dealButton.addEventListener('click', () => {
    document.getElementById('prompt').innerText = '';
    chips.innerText = ''
    let cash = parseFloat(inputBet.value)
    if (cash <= player.cash) {
        runGame(gameDeck, player, dealer, cash)
    } else {
        document.getElementById('prompt').innerText = 'You do not have enough cash try again.';
    }
    inputBet.value = ''
})


// call runGame with the above three objects as params
// runGame(gameDeck, player, dealer)