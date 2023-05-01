# BlackJack  
Welcome to my Blackjack game built with JavaScript! This game is a web-based implementation of the classic card game, where the goal is to get as close to 21 points as possible without going over. In this game, you'll be playing against the computer, which acts as the dealer. The game features a simple and intuitive user interface, with easy-to-use controls and clear instructions to guide you through the game.
## How to play
To play the game, simply navigate to [https://samtessema9.github.io/Project1/](https://samtessema9.github.io/Project1/) in your web browser. The game will load and you will be prompted to place your bet. Use the input field on the screen to enter your bet amount, and then click the "Deal" button to start the game.

Once the game has started, you will be dealt two cards and the dealer will be dealt one card face up. Follow the on-screen instructions to choose whether to hit, stand, or double down. The goal is to get as close to 21 as possible without going over.

When the round is over, the game will automatically calculate the winnings or losses and update your chip balance. You can then place another bet and start a new round.
## Technologies used
- **HTML**: Used for the overall structure of the game and to display the user interface elements.
- **CSS**: Used for styling and layout of the game interface.
- **JavaScript**: Used for the game logic and to interact with the HTML and CSS.
## Approach Taken
The game's user interface is created using HTML and CSS, while the game logic is implemented in JavaScript. The game was built using object-oriented programming principles, with separate classes for the deck, cards, the player and the dealer. The use of classes also allowed me to store and persist the state of these objects throughout the game, ensuring that the proper information was displayed to the user at all times. This approach also allowed me to break down the game's functionality into different methods that were attached to these classes and were called as needed.

The game was designed to closely follow standard Blackjack rules, with a few minor tweaks to simplify the game for a single player. The user interface was designed to be simple and intuitive, with clear instructions and buttons to guide the player through each step of the game. 
## Unsolved Problems / Upcoming Features
- **Deck Reload Functionality:** Currently, the game does not have a function to reload the deck once it has run out of cards. This means that the game can only be played once until the page is refreshed. I plan to add a function that allows the deck to be reloaded, so the game can be played continuously.
- **Money Reload Functionality:** At the moment, the game doesn't have a way to reload the player's balance once it runs out. This means that once the player runs out of money, the game cannot be played until the page is refreshed. I plan to add a function that allows the player to reload their balance in the future.
- **Split Functionality:** Currently, the game does not have a split functionality, which is a common feature in blackjack. Splitting allows the player to split their hand into two separate hands if they are dealt a pair of cards with the same rank. This will be the most challenging feature to implement but i plan to add it soon.
## Toughest challenges
- Resetting everything after each hand was a difficult challenge due to the numerous moving parts involved in the game. It was crucial to make sure that all objects were properly reset to their initial states, including the player's and dealer's hands, as well as all the dealt cards and the event handleres attached to the buttons.
- Dealing with event listeners was another challenge, particularly since information cannot be retrieved from callback functions easily. This made it challenging to keep track of game state and player input.
- Handling aces proved to be a difficult task due to a simple bug that was difficult to detect. Aces can have a value of 1 or 11 depending on the hand, and ensuring that the correct value was assigned required careful programming and testi
