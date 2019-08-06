export interface Player {
  deck: number;
  cards: number[];
}

export interface Game {
  id: string;
  playerOne: Player;
  playerTwo: Player;
  winner?: string;
}
