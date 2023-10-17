export interface IUser {
  id: string;
  name: string;
  gameId: string,
}

export interface ICharacter {
  id: string;
  name: string;
  playerPosition: number;
}

export interface IPlayer {
  id: string;
  name: string;
  playerPosition: number;
  isNpc: boolean;
  isActive: boolean;
  userId: string;
}

export interface IGame {
  id: string;
  room: string;
  ownerId: string;
  qtdPlayers: number;
  players: IPlayer[];
  activeIndex: number;
  rollDice: boolean;
  diceValue: number;
  status: string;
}

export interface ICard {
  id: string;
  name: string;
  category: string;
}
