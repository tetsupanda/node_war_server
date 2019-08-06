"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGame = (id) => {
    const initDeck = Array.from(new Array(52), (x, i) => i);
    const playerOneStartingDeck = exports.buildPlayerDeck(initDeck, 26);
    const playerTwoStartingDeck = exports.buildPlayerDeck(initDeck, 26);
    return {
        id: id.toString(),
        playerOne: {
            deck: playerOneStartingDeck.length,
            cards: playerOneStartingDeck
        },
        playerTwo: {
            deck: playerTwoStartingDeck.length,
            cards: playerTwoStartingDeck
        }
    };
};
exports.buildPlayerDeck = (deck, count) => {
    const newPlayerDeck = [];
    while (newPlayerDeck.length !== count) {
        newPlayerDeck.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0]);
    }
    return newPlayerDeck;
};
