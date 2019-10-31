import { expect } from "chai";
import { initGame, buildPlayerDeck } from "../initGame";
import { Game } from "../interfaces";
import { simpleWarLoop } from "../war";
import { randomBytes } from "crypto";

let game: Game;

describe("initGame Test", () => {
  it("should return a new game", () => {
    const newGameId = randomBytes(16).toString('hex');
    game = initGame(newGameId);

    expect(game.id).to.equal(newGameId);
    expect(game.playerOne.deck).to.equal(26);
    expect(game.playerTwo.deck).to.equal(26);
  });
});

describe("buildPlayerDeck test", () => {
  it("should build a deck with 26 values", () => {
    const initDeck = Array.from(new Array(52), (x, i) => i);
    const newDeck = buildPlayerDeck(initDeck, 26);

    expect(newDeck.length).to.equal(26);
  });
});

describe("warLoop test", () => {
  it("should return a game object with a winner", () => {
    game = simpleWarLoop(game);

    expect(game.winner).to.not.be.null;
  });
});
