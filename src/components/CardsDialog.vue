<template>
  <q-dialog
    v-model="layoutStore.cardsDialog"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="q-dialog-plugin" style="width: 1200px !important">
      <q-card-section class="q-dialog__title">Suas Cartas</q-card-section>
      <q-card-section class="q-dialog__message">
        <div class="characters-container">
          <div
            class="character-card"
            v-for="(card, index) in myPlayer.cards"
            :key="index"
          >
            <q-img
              height="100%"
              width="100%"
              :src="`img/cards/${card.name}.jpg`"
            ></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLayoutStore } from 'stores/layout';
import { useSessionStore } from 'stores/session';

export default defineComponent({
  name: 'CardsDialogComponent',

  setup() {
    const layoutStore = useLayoutStore();
    const sessionStore = useSessionStore();

    return {
      layoutStore,
      sessionStore,
    };
  },

  computed: {
    myPlayer() {
      return this.sessionStore.game.players.find(
        (p) => p.id === this.sessionStore.playerSelected.id
      );
    },
  },

  methods: {},
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
</style>
