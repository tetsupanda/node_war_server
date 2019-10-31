"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleWarLoop = (game) => {
    let playerOneDeck = game.playerOne.cards;
    let playerTwoDeck = game.playerTwo.cards;
    const playerOnePlayedCards = [];
    const playerTwoPlayedCards = [];
    let currentPot = [];
    while (true) {
        if (playerOneDeck.length === 0 || playerTwoDeck.length === 0) {
            break;
        }
        const playerOneCard = playerOneDeck.shift();
        const playerTwoCard = playerTwoDeck.shift();
        playerOnePlayedCards.push(playerOneCard);
        playerTwoPlayedCards.push(playerTwoCard);
        currentPot = [...currentPot, playerOneCard, playerTwoCard];
        const p1Value = (playerOneCard % 13) + 1;
        const p2Value = (playerTwoCard % 13) + 1;
        if (p1Value === p2Value) {
            if (playerOneDeck.length <= 3 || playerTwoDeck.length <= 3) {
                break;
            }
            currentPot.push(playerOneDeck.shift());
            currentPot.push(playerOneDeck.shift());
            currentPot.push(playerOneDeck.shift());
            currentPot.push(playerTwoDeck.shift());
            currentPot.push(playerTwoDeck.shift());
            currentPot.push(playerTwoDeck.shift());
        }
        else if (p1Value > p2Value) {
            playerOneDeck = [...playerOneDeck, ...currentPot];
            currentPot.length = 0;
        }
        else {
            playerTwoDeck = [...playerTwoDeck, ...currentPot];
            currentPot.length = 0;
        }
    }
    game.playerOne.cards = playerOnePlayedCards;
    game.playerTwo.cards = playerTwoPlayedCards;
    game.playerOne.deck = playerOneDeck.length;
    game.playerTwo.deck = playerTwoDeck.length;
    game.winner =
        playerTwoDeck.length > playerOneDeck.length ? "playerTwo" : "playerOne";
    return game;
};
