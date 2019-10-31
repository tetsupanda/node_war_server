import * as express from "express";
import { Game } from "./interfaces";
import { initGame } from "./initGame";
import { simpleWarLoop } from "./war";
import { randomBytes } from "crypto";

const gamesArray: Game[] = [];

const main = () => {
  const appPort = 8080;
  const app = express();

  app.put("/game", (req, res) => {
    const gameId = randomBytes(16).toString('hex');
    const newGame = initGame(gameId);
    gamesArray.push(newGame);

    console.log(`PUT new game: ${newGame.id}`);
    console.log(`Current game count ${gamesArray.length}`);
    res.status(200).json({ id: newGame.id });
  });

  app.get("/game/:id", (req, res) => {

    console.log(gamesArray);

    let gameStatus;
    if(req.params.id) {
      gameStatus = gamesArray.find(game => game.id === req.params.id);
    }
    console.log(gameStatus);

    if (!gameStatus) {
      res.status(404).json({ Error: "Game Not Found" });
    }

    const playerOneDeckCount = gameStatus.playerOne.deck;
    const playerTwoDeckCount = gameStatus.playerTwo.deck;

    console.log(`Player One deck count: ${playerOneDeckCount}`);
    console.log(`Player Two deck count: ${playerTwoDeckCount}`);
    res
      .status(200)
      .json({ playerOne: playerOneDeckCount, playerTwo: playerTwoDeckCount });
  });

  app.post("/game/:id/play", (req, res) => {
    const game = gamesArray.find(game => game.id === req.params.id);

    if (!game) {
      res.status(404).json({ Error: "Game Not Found" });
    }
    const playedGame = simpleWarLoop(game);

    const winner = playedGame.winner;
    console.log(`The winner was ${winner}`);

    gamesArray.splice(gamesArray.indexOf(game), 1);

    res.status(200).json({
      winner,
      playerOne: { deck: playedGame.playerOne.deck, cards: playedGame.playerOne.cards },
      playerTwo: { deck: playedGame.playerTwo.deck, cards: playedGame.playerTwo.cards }
    });
  });

  app.listen(appPort, () =>
    console.log(`Server listening on port: ${appPort}`)
  );
};

main();
