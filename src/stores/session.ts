import { defineStore } from 'pinia';
import { IUser, IPlayer, IGame, ICharacter, ICard, IPlace } from "src/models";
import { useFirebaseStore } from 'stores/firebase';

export const useSessionStore = defineStore('session', {
  state: () => ({
    characters: [] as ICharacter[],
    cards: [] as ICard[],

    user: {
      id: '',
      name: '',
      gameId: '',
    } as IUser,

    game: {
      id: '',
      room: '',
      ownerId: '',
      qtdPlayers: 3,
      players: [],
      targets: [],
      activeIndex: 0,
      rollDice: false,
      diceValue: 0,
      place: {} as IPlace,
      status: "",
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
      const firebaseStore = useFirebaseStore();

      this.game = {
        id: '',
        room: '',
        ownerId: '',
        qtdPlayers: 6,
        players: [],
        targets: [],
        activeIndex: 0,
        rollDice: false,
        diceValue: 0,
        place: {} as IPlace,
        status: "",
      }
      this.playerSelected = {}
      this.user.gameId = ''
      firebaseStore.updateUser(this.user)
    },
  },
});
