import { defineStore } from 'pinia';

interface IPlayer {
  name: string;
  playerPosition: number;
}

export const useSessionStore = defineStore('session', {
  state: () => ({
    players: [
      { name: 'plum', playerPosition: 120 },
      { name: 'scarlett', playerPosition: 16 },
      { name: 'mustard', playerPosition: 191 },
      { name: 'white', playerPosition: 590 },
      { name: 'green', playerPosition: 585 },
      { name: 'peacock', playerPosition: 432 },

    ],
    playerSelected: {
      name: 'white',
      playerPosition: 590
    },
    activeIndex: 0,
    rollDice: false,
    diceValue: 0,
  }),

  getters: {
    activePlayer(): IPlayer {
      return this.players[this.activeIndex];
    }
  },

  actions: {
    setPlayerSelected(payload: IPlayer) {
      this.playerSelected = payload
    },
    changeActivePlayer() {
      if (this.activeIndex < 5) {
        this.activeIndex++
      } else {
        this.activeIndex = 0
      }
    },
  },
});
