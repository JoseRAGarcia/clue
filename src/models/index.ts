export interface IUser {
  id: string | null;
}

export interface ICharacter {
  name: string;
  playerPosition: number;
}

export interface IPlayer {
  name: string;
  playerPosition: number;
  isNpc: boolean;
  isActive: boolean;
}

export interface IGame {
  id: string | null;
  room: string | null;
  qtdPlayers: number;
  players: IPlayer[];
  activeIndex: number;
  rollDice: boolean;
  diceValue: number;
}
