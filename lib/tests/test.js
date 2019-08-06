"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const initGame_1 = require("../initGame");
const war_1 = require("../war");
let game;
describe("initGame Test", () => {
    it("should return a new game", () => {
        const newGameId = 2;
        game = initGame_1.initGame(newGameId);
        chai_1.expect(game.id).to.equal(newGameId.toString());
        chai_1.expect(game.playerOne.deck).to.equal(26);
        chai_1.expect(game.playerTwo.deck).to.equal(26);
    });
});
describe("buildPlayerDeck test", () => {
    it("should build a deck with 26 values", () => {
        const initDeck = Array.from(new Array(52), (x, i) => i);
        const newDeck = initGame_1.buildPlayerDeck(initDeck, 26);
        chai_1.expect(newDeck.length).to.equal(26);
    });
});
describe("warLoop test", () => {
    it("should return a game object with a winner", () => {
        game = war_1.simpleWarLoop(game);
        chai_1.expect(game.winner).to.not.be.null;
    });
});
