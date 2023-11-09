<template>
  <q-page class="clue-page shadow-21 row items-center justify-evenly q-pa-md">
    <div class="config-icon absolute-left q-pa-md">
      <div class="relative-position" v-ripple>
        <q-icon
          class="cursor-pointer"
          color="info"
          name="arrow_back"
          size="32px"
          @click="$router.push('/home')"
        />
      </div>
    </div>
    <q-card class="q-pa-md shadow-21">
      <div class="text-h6 q-mb-sm full-width flex flex-center">
        <span>Sala:</span>
        <span class="q-ml-sm text-primary">{{ sessionStore.game.room }}</span>
      </div>
      <div class="text-h5 text-primary text-bold q-mb-sm">
        Escolha seu personagem
      </div>
      <div class="characters-container">
        <div
          class="character-card cursor-pointer relative-position"
          :class="{
            'player-selected shadow-21': sessionStore.game.players.some(
              (p) => p.name === character.name && !p.isNpc
            ),
            'player-out-game': sessionStore.game.players.every(
              (p) => p.name !== character.name
            ),
          }"
          v-for="(character, index) in loadingCharacters
            ? 6
            : sessionStore.characters"
          :key="index"
          v-ripple
          @click="setPlayer(character)"
        >
          <div v-if="loadingCharacters">
            <q-skeleton width="91px" height="128px" />
          </div>
          <q-img
            v-else
            height="100%"
            width="100%"
            :src="`img/cards/${character.name}.jpg`"
          ></q-img>
          <div
            v-if="
              sessionStore.game.players.some(
                (p) => p.name === character.name && !p.isNpc
              )
            "
            class="username-container"
            :style="`border: 5px solid var(--${character.name}-color);`"
          >
            <div
              class="username ellipsis"
              :style="`background: var(--${character.name}-color); color: ${
                character.name === 'white' ? '#000' : '#fff'
              }`"
            >
              {{ sessionStore.user.name }}
            </div>
          </div>
        </div>
      </div>
    </q-card>

    <q-btn
      v-if="sessionStore.game.ownerId === sessionStore.user.id"
      :disable="!sessionStore.playerSelected.name"
      class="full-width"
      color="primary"
      label="Iniciar Jogo"
      @click="setBots"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSessionStore } from 'stores/session';
import { useLayoutStore } from 'stores/layout';
import { useFirebaseStore } from 'stores/firebase';

import { ICharacter, IPlayer, ICard } from 'src/models';

export default defineComponent({
  name: 'WaitingRoom',

  setup() {
    const sessionStore = useSessionStore();
    const layoutStore = useLayoutStore();
    const firebaseStore = useFirebaseStore();

    return {
      sessionStore,
      layoutStore,
      firebaseStore,
    };
  },

  async mounted() {
    this.loadingCharacters = true;
    await this.firebaseStore.getCharacters().then((response) => {
      this.sessionStore.characters = Array.from(response);
    });
    await this.firebaseStore.getCards().then((response) => {
      this.sessionStore.cards = Array.from(response);
    });
    this.loadingCharacters = false;
  },

  beforeRouteEnter(to, from, next) {
    const sessionStore = useSessionStore();

    if (!sessionStore.game.id) {
      next(from);
    } else {
      next();
    }
  },

  beforeRouteLeave(to, from, next) {
    if (to.path === '/game') return next();

    if (
      this.sessionStore.game.id &&
      this.sessionStore.game.status !== 'started'
    ) {
      next(from);
      this.layoutStore.exitGameDialog = true;
    } else {
      next();
    }
  },

  data() {
    return {
      loadingCharacters: false,
    };
  },

  watch: {
    'sessionStore.game': {
      handler: function (novo) {
        if (!novo.id) {
          this.$router.push('/home');
        } else if (novo.status === 'started') {
          this.$router.push('/game');
        }
      },
      deep: true,
    },
  },

  methods: {
    async setPlayer(character: ICharacter) {
      const playerInGameIndex: number =
        this.sessionStore.game.players.findIndex(
          (p) => p.id === this.sessionStore.playerSelected?.id
        );

      if (playerInGameIndex >= 0) {
        this.sessionStore.game.players.splice(playerInGameIndex, 1);
      }

      const player: IPlayer = {
        ...character,
        isNpc: false,
        isActive: false,
        userId: `/user/${this.sessionStore.user.id}`,
        cards: [],
      };

      this.sessionStore.game.players.push(player);
      this.sessionStore.playerSelected = player;

      await this.firebaseStore.updateGame(this.sessionStore.game);
    },

    setBots() {
      this.sessionStore.characters.forEach((character) => {
        if (
          this.sessionStore.game.players.length <
            this.sessionStore.game.qtdPlayers &&
          this.sessionStore.game.players.every((p) => p.name !== character.name)
        ) {
          const player: IPlayer = {
            ...character,
            isNpc: true,
            isActive: false,
            userId: '',
            cards: [],
          };

          this.sessionStore.game.players.push(player);
        }
      });

      this.giveCards();
    },

    async giveCards() {
      const characterCards = this.sessionStore.cards.filter(
        (c) => c.category === 'character'
      );
      const weaponCards = this.sessionStore.cards.filter(
        (c) => c.category === 'weapon'
      );
      const placeCards = this.sessionStore.cards.filter(
        (c) => c.category === 'place'
      );

      const targetCharacter =
        characterCards[Math.floor(Math.random() * characterCards.length)];
      const targetWeapon =
        weaponCards[Math.floor(Math.random() * weaponCards.length)];
      const targetPlace =
        placeCards[Math.floor(Math.random() * placeCards.length)];

      this.sessionStore.game.targets = [
        targetCharacter,
        targetWeapon,
        targetPlace,
      ];

      const randomCards = this.shuffle(this.sessionStore.cards);
      const givenCards: ICard[] = [];
      let playerIndex = 0;

      console.log('randomCards', randomCards);

      randomCards.forEach((card) => {
        const isTarget = this.sessionStore.game.targets.find(
          (c) => c.id === card.id
        );
        const isGivenCard = givenCards.find((c) => c.id === card.id);

        if (isTarget || isGivenCard) return;

        this.sessionStore.game.players[playerIndex].cards.push(card);
        givenCards.push(card);

        if (playerIndex < this.sessionStore.game.qtdPlayers - 1) {
          playerIndex++;
        } else {
          playerIndex = 0;
        }
      });

      this.startGame();
    },

    async startGame() {
      this.sessionStore.game.status = 'started';

      this.layoutStore.loadingLayout = true;
      await this.firebaseStore.updateGame(this.sessionStore.game).then(() => {
        this.$router.push('/game');
      });
      this.layoutStore.loadingLayout = false;
    },

    shuffle(array: any[]) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },
  },
});
</script>

<style scoped>
.characters-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 128px);
  grid-gap: 25px;
  margin: 0 auto;
  justify-content: center;
}

.character-card {
  width: 91px;
  height: 128px;
  opacity: 1;
  transition: all 0.3s;
}

.player-selected {
  transform: scale(115%);
  z-index: 1;
  pointer-events: none;
  touch-action: none;
}

.player-out-game {
  opacity: 0.5;
  filter: grayscale(1);
}

.username-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0;
}
.username {
  padding: 2px;
  border-radius: 0 0 0 5px;
  opacity: 0.8;
}
</style>
