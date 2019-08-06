"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const initGame_1 = require("./initGame");
const war_1 = require("./war");
let gameId = 0;
let game;
const main = () => {
    const appPort = 8080;
    const app = express();
    app.put("/game", (req, res) => {
        gameId++;
        game = initGame_1.initGame(gameId);
        res.status(200).json({ id: game.id });
    });
    app.get("/game/:id", (req, res) => {
        if (req.params.id !== game.id) {
            res.status(404).json({ Error: "Game Not Found" });
        }
        res
            .status(200)
            .json({ playerOne: game.playerOne.deck, playerTwo: game.playerTwo.deck });
    });
    app.post("/game/:id/play", (req, res) => {
        if (req.params.id !== game.id) {
            res.status(404).json({ Error: "Game Not Found" });
        }
        game = war_1.simpleWarLoop(game);
        res.status(200).json({
            winner: game.winner,
            playerOne: { deck: game.playerOne.deck, cards: game.playerOne.cards },
            playerTwo: { deck: game.playerTwo.deck, cards: game.playerTwo.cards }
        });
    });
    app.listen(appPort, () => console.log(`Server listening on port: ${appPort}`));
};
main();
