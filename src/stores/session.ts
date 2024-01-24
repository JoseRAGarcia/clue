import { defineStore } from 'pinia';
import { IUser, IPlayer, IGame, ICharacter, ICard, IIndictment } from "src/models";
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
      qtdPlayers: 6,
      players: [],
      targets: [],
      activeIndex: 0,
      rollDice: false,
      diceValue: 0,
      indictment: {
        indictment: false,
        indictmentMade: false,
        character: '',
        weapon: '',
        place: '',
        answerPlayerId: '',
        answerCardName: '',
        answersList: []
      } as IIndictment,
      status: "",
      winnerId: '',
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

    setAnswerPlayerId(playerId: string) {
      const playerIndex = this.game.players.findIndex(p => p.id === playerId)
      if (playerIndex >= 0) {
        if (playerIndex + 1 < this.game.players.length) {
          this.game.indictment.answerPlayerId = this.game.players[playerIndex + 1].id
        } else {
          this.game.indictment.answerPlayerId = this.game.players[0].id
        }
      }
    },

    cleanGame() {
      const firebaseStore = useFirebaseStore();

      this.game = {
        ...this.game,
        id: '',
        room: '',
        ownerId: '',
        players: [],
        targets: [],
        activeIndex: 0,
        rollDice: false,
        diceValue: 0,
        indictment: {
          indictment: false,
          indictmentMade: false,
          character: '',
          weapon: '',
          place: '',
          answerPlayerId: '',
          answerCardName: '',
          answersList: []
        } as IIndictment,
        status: "",
        winnerId: '',
      }

      this.playerSelected = {}
      this.user.gameId = ''
      firebaseStore.updateUser(this.user)
    },
  },
});
