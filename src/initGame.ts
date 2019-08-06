import { Game } from "./interfaces";

export const initGame = (id: number): Game => {
  const initDeck = Array.from(new Array(52), (x, i) => i);

  const playerOneStartingDeck = buildPlayerDeck(initDeck, 26);
  const playerTwoStartingDeck = buildPlayerDeck(initDeck, 26);

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

export const buildPlayerDeck = (deck: number[], count: number): number[] => {
  const newPlayerDeck = [];
  while (newPlayerDeck.length !== count) {
    newPlayerDeck.push(
      deck.splice(Math.floor(Math.random() * deck.length), 1)[0]
    );
  }
  return newPlayerDeck;
};
