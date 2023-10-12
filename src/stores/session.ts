import { defineStore } from 'pinia';
import { IUser, IPlayer, IGame, ICharacter } from "src/models"

export const useSessionStore = defineStore('session', {
  state: () => ({
    characters: [
      { name: 'plum', playerPosition: 120 },
      { name: 'scarlett', playerPosition: 16 },
      { name: 'mustard', playerPosition: 191 },
      { name: 'white', playerPosition: 590 },
      { name: 'green', playerPosition: 585 },
      { name: 'peacock', playerPosition: 432 },
    ] as ICharacter[],

    user: {
      id: null
    } as IUser,

    game: {
      id: null,
      room: null,
      qtdPlayers: 6,
      players: [],
      activeIndex: 0,
      rollDice: false,
      diceValue: 0,
    } as IGame,

    playerSelected: {} as IPlayer | any,
  }),

  getters: {
    activePlayer(): IPlayer {
      return this.game.players[this.game.activeIndex];
    }
  },

  actions: {
    changeActivePlayer() {
      if (this.game.activeIndex < this.game.players.length - 1) {
        this.game.activeIndex++
      } else {
        this.game.activeIndex = 0
      }
    },

    cleanGame() {
      this.game = {
        id: null,
        room: null,
        qtdPlayers: this.game.qtdPlayers,
        players: [],
        activeIndex: 0,
        rollDice: false,
        diceValue: 0,
      }
      this.playerSelected = {}
    },
  },
});
