<template>
  <q-page class="clue-container row items-center justify-evenly q-pa-md">
    <div class="config-icon absolute-left q-pa-md">
      <div class="relative-position" v-ripple>
        <q-icon
          class="cursor-pointer"
          color="info"
          name="arrow_back"
          size="32px"
          @click="$router.go(-1)"
        />
      </div>
    </div>
    <q-card class="q-pa-sm shadow-15">
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
            'player-selected shadow-21 z-top': sessionStore.game.players.some(
              (p) => p.name === character.name && !p.isNpc
            ),
            'player-out-game': sessionStore.game.players.every(
              (p) => p.name !== character.name
            ),
          }"
          v-for="(character, index) in sessionStore.characters"
          :key="index"
          v-ripple
          @click="setPlayer(character)"
        >
          <q-img
            height="100%"
            width="100%"
            :src="`img/cards/${character.name}.jpg`"
          ></q-img>
        </div>
      </div>
    </q-card>

    <q-btn
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

import { ICharacter, IPlayer } from 'src/models';

export default defineComponent({
  name: 'WaitingRoom',

  setup() {
    const sessionStore = useSessionStore();
    const layoutStore = useLayoutStore();

    return {
      sessionStore,
      layoutStore,
    };
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

  methods: {
    setPlayer(character: ICharacter) {
      console.log(character);

      const playerInGameIndex: number =
        this.sessionStore.game.players.findIndex(
          (p) => p.name === this.sessionStore.playerSelected?.name
        );

      if (playerInGameIndex >= 0) {
        this.sessionStore.game.players.splice(playerInGameIndex, 1);
      }

      const player: IPlayer = {
        name: character.name,
        playerPosition: character.playerPosition,
        isNpc: false,
        isActive: false,
      };

      this.sessionStore.game.players.push(player);
      this.sessionStore.playerSelected = player;
    },

    setBots() {
      this.sessionStore.characters.forEach((character) => {
        if (
          this.sessionStore.game.players.length <
            this.sessionStore.game.qtdPlayers &&
          this.sessionStore.game.players.every((p) => p.name !== character.name)
        ) {
          const player: IPlayer = {
            name: character.name,
            playerPosition: character.playerPosition,
            isNpc: true,
            isActive: false,
          };

          this.sessionStore.game.players.push(player);
        }
      });

      console.log('set bots', this.sessionStore.game.players);

      this.startGame();
    },

    startGame() {
      this.layoutStore.loadingLayout = true;
      setTimeout(() => {
        this.layoutStore.loadingLayout = false;
        this.sessionStore.game.status = 'started';
        this.$router.push('/game');
      }, 500);
    },
  },
});
</script>

<style scoped>
.characters-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 128px);
  grid-gap: 10px;
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
  transform: scale(120%);
}

.player-out-game {
  opacity: 0.5;
  filter: grayscale(1);
}
</style>
