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
  cards: ICard[];
  checklist: ICard[];
  suspicious: ICard[];
}

export interface ICard {
  id: string;
  name: string;
  category: string;
}

export interface IAnswer {
  answered: boolean;
  text: string;
}

export interface IIndictment {
  indictment: boolean;
  indictmentMade: boolean;
  character: string;
  weapon: string;
  place: string;
  answerPlayerId: string;
  answerCardName: string;
  cardShown: ICard;
  answersList: IAnswer[];
}

export interface IDoor {
  door: number;
  entry: number;
  place: string;
}

export interface IConfig {
  pawnsQtd: number;
  doubleDice: boolean;
}

export interface IGame {
  id: string;
  room: string;
  ownerId: string;
  config: IConfig;
  players: IPlayer[];
  targets: ICard[];
  activeIndex: number;
  rollDice: boolean;
  diceValue: number;
  status: string;
  indictment: IIndictment;
  winnerId: string;
}
