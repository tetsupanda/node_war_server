import * as express from "express";
import { Game } from "./interfaces";
import { initGame } from "./initGame";
import { simpleWarLoop } from "./war";

let gameId = 0;
let game: Game;

const main = () => {
  const appPort = 8080;
  const app = express();

  app.put("/game", (req, res) => {
    gameId++;
    game = initGame(gameId);
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
    game = simpleWarLoop(game);

    res.status(200).json({
      winner: game.winner,
      playerOne: { deck: game.playerOne.deck, cards: game.playerOne.cards },
      playerTwo: { deck: game.playerTwo.deck, cards: game.playerTwo.cards }
    });
  });

  app.listen(appPort, () =>
    console.log(`Server listening on port: ${appPort}`)
  );
};

main();
