import { Game } from "./interfaces";

export const simpleWarLoop = (game: Game): Game => {
  let playerOneWar = [];
  let playerTwoWar = [];

  let playerOneDeck = game.playerOne.cards;
  let playerTwoDeck = game.playerTwo.cards;

  const playerOnePlayedCards = [];
  const playerTwoPlayedCards = [];

  while (playerOneDeck.length > 0 && playerTwoDeck.length > 0) {
    const playerOneCard = playerOneDeck.shift();
    const playerTwoCard = playerTwoDeck.shift();

    playerOnePlayedCards.push(playerOneCard);
    playerTwoPlayedCards.push(playerTwoCard);

    playerOneWar.push(playerOneCard);
    playerTwoWar.push(playerTwoCard);

    const p1Value = (playerOneCard % 13) + 1;
    const p2Value = (playerTwoCard % 13) + 1;

    if (playerOneDeck.length < 3 || playerTwoDeck.length < 3) {
      break;
    }

    if (p1Value === p2Value) {
      playerOneWar.push(playerOneDeck.shift());
      playerOneWar.push(playerOneDeck.shift());
      playerOneWar.push(playerOneDeck.shift());

      playerTwoWar.push(playerTwoDeck.shift());
      playerTwoWar.push(playerTwoDeck.shift());
      playerTwoWar.push(playerTwoDeck.shift());
    } else if (p1Value > p2Value) {
      playerOneDeck = playerOneDeck.concat(playerOneWar, playerTwoWar);
      playerOneWar = [];
      playerTwoWar = [];
    } else {
      playerTwoDeck = playerTwoDeck.concat(playerOneWar, playerTwoWar);
      playerOneWar = [];
      playerTwoWar = [];
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
