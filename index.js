import {Card, Deck, Player, Dealer} from './classes.js'


// const dealInitial = (deck) => {
//     deck.shuffle()
//     let playerCards = [];
//     let dealerCards = [];

//     let faceDownCard = deck.deck.pop()
//     dealerCards.push(faceDownCard)
//     let d1 = document.getElementById('dealer-1')
//     // d1.innerHTML = ''
//     d1.appendChild(deck.flippeCard())
    
//     let playerCard1 = deck.deck.pop()
//     playerCards.push(playerCard1)
//     let p1 = document.getElementById('player-1')
//     // p1.innerHTML = ''
//     p1.appendChild(deck.deal(playerCard1))
    
//     let dealerCard2 = deck.deck.pop()
//     dealerCards.push(dealerCard2)
//     let d2 = document.getElementById('dealer-2')
//     // d2.innerHTML = ''
//     d2.appendChild(deck.deal(dealerCard2))

//     let playerCard2 = deck.deck.pop()
//     playerCards.push(playerCard2)
//     let p2 = document.getElementById('player-2')
//     // p2.innerHTML = ''
//     p2.appendChild(deck.deal(playerCard2))

//     return {dealerCards, playerCards}
// }

// const runGame = () => {
//     const deck = new Deck();
//     let playerDivs = ['player-3', 'player-4', 'player-5']
//     let playerPointer = 0
//     let dealerDivs = ['dealer-3', 'dealer-4', 'dealer-5']
//     let dealerPointer = 0
//     let init = dealInitial(deck)

//     const resetGame = () => {
//         let generated = document.querySelectorAll('.generated')
//         console.log(generated)
//         for (let element of generated) {
//             element.remove()
//         }

//         let buttons = document.getElementsByClassName('button');
//         console.log(buttons)
//         for (let button of buttons) {
//             button.disabled = false;
//         //     if (button.className.includes('hit-button')) {
//         //         button.removeEventListener('click', rem)
//         //     }
//         }
//         document.getElementById('output').innerText = ``        
//     }

//     let dealertotal = init.dealerCards.reduce((acc, card) => acc + card.value, 0)
//     console.log('dealertotal: ', dealertotal)

//     let playertotal = init.playerCards.reduce((acc, card) => acc + card.value, 0)
//     console.log('playertotal: ', playertotal)

//     let hit = document.getElementById('hit-button')
//     hit.addEventListener('click', function rem (e) {
//         let card = deck.deck.pop()
//         // init.playerCards.push(card)
//         document.getElementById(playerDivs[playerPointer]).appendChild(deck.deal(card))
//         playerPointer++
//         playertotal += card.value;
//         console.log('playertotal: ', playertotal)
//         if (playertotal >= 21) {
//             e.target.disabled = true;
//             document.getElementById('output').innerText = `Dealer wins!!`
//             // runGame()
//             // resetGame()
            
//             setTimeout(runGame, 3000)
//             console.log('dealer wins')
//         }
//     })

//     let stay = document.getElementById('stay-button')
//     stay.addEventListener('click', (e) => {
//         hit.disabled = true;
//         console.log(hit)
//         e.target.disabled = true;
//         // handleStay()
//     })
// }

// runGame()

const working = () => {
    console.log('working')
}


const dealInitial = (deck, player, dealer) => {
    deck.shuffle()

    let faceDownCard = deck.deck.pop()
    dealer.hit(faceDownCard)
    let d1 = document.getElementById('dealer-1')
    d1.innerHTML = ''
    d1.appendChild(deck.flippeCard())
    
    let playerCard1 = deck.deck.pop()
    player.hit(playerCard1)
    let p1 = document.getElementById('player-1')
    p1.innerHTML = ''
    p1.appendChild(deck.deal(playerCard1))
    
    let dealerCard2 = deck.deck.pop()
    dealer.hit(dealerCard2)
    let d2 = document.getElementById('dealer-2')
    d2.innerHTML = ''
    d2.appendChild(deck.deal(dealerCard2))

    let playerCard2 = deck.deck.pop()
    player.hit(playerCard2)
    let p2 = document.getElementById('player-2')
    p2.innerHTML = ''
    p2.appendChild(deck.deal(playerCard2))
}

const runGame = (deck, player, dealer) => {
    dealInitial(deck, player, dealer)
    let outPut = document.getElementById('output')
    console.log('dealer: ' + dealer.total())
    console.log('player: ' + player.total())
    console.log(player.hand)
    let dealerPointer = 0
    let playerPointer = 0

    let hitButton = document.getElementById('hit-button')

    let stayButton = document.getElementById('stay-button')
    const handleHit = (e) => {
        let card = deck.deck.pop()
        player.hit(card)
        console.log(player.hand)
        console.log(player.total())
        document.getElementById(player.spaces[playerPointer]).appendChild(deck.deal(card))

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
        hitButton.disabled = true;
        e.target.disabled = true;
        dealer.showHiddenCard()

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
            while (dealer.total() < 17) {
                let card = deck.deck.pop()
                dealer.hit(card)
                document.getElementById(dealer.spaces[dealerPointer]).appendChild(deck.deal(card))
                dealerPointer++
            }
            if (dealer.total() > 21) {
                outPut.innerText = 'Dealer busts you win!!!'
                setTimeout(resetGame, 2000)            
            } else {
                if (player.total() > dealer.total()) {
                    outPut.innerText = 'You win!!!'
                    setTimeout(resetGame, 2000)                
                } else if (dealer.total() > player.total()) {
                    outPut.innerText = 'House wins :('
                    setTimeout(resetGame, 2000)                
                } else {
                    outPut.innerText = 'Its a tie.'
                    setTimeout(resetGame, 2000)                }
            }
        }
    }

    hitButton.removeEventListener('click', handleHit)


    stayButton.removeEventListener('click', handleStay)


    const resetGame = () => {
        let generated = document.querySelectorAll('.generated')
        for (let element of generated) {
            element.remove()
        }
        let buttons = document.querySelectorAll('.button')
        for (let element of buttons) {
            element.disabled = false;
        }
        player.clearHand()
        dealer.clearHand()
        outPut.innerText = ''

        runGame(deck, player, dealer)
    }
    
    if (player.total() == 21) {
        outPut.innerText = 'Blackjack!!!'
        // resetGame()
    } else if (dealer.total() == 21) {
        outPut.innerText = 'Dealer Blackjack :('
        // resetGame()
    }



    
    

    
    hitButton.addEventListener('click', handleHit)

    
    stayButton.addEventListener('click', handleStay)
}


let player = new Player()

let dealer = new Dealer()

let gameDeck = new Deck()

runGame(gameDeck, player, dealer)