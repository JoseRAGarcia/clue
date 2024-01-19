<template>
  <q-dialog
    v-model="layoutStore.indictmentDialog"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="q-dialog-plugin" style="width: 1200px !important">
      <q-card-section class="q-dialog__title"> Escolha {{}} </q-card-section>
      <q-card-section class="q-dialog__message">
        <q-tabs no-caps>
          <q-tab
            style="height: 250px"
            v-for="card in sessionStore.cards.filter(
              (c) => c.category === 'character'
            )"
            :key="card.id"
            :name="card.name"
            @click="setCardIndictment(card)"
          >
            <div
              class="indictment-card"
              :class="{
                'card-selected shadow-21':
                  sessionStore.game.indictment[card.category] === card.name,
              }"
            >
              <q-img
                height="100%"
                width="100%"
                :src="`img/cards/${card.name}.jpg`"
              ></q-img>
            </div>
          </q-tab>
        </q-tabs>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLayoutStore } from 'stores/layout';
import { useSessionStore } from 'stores/session';
import { ICard } from 'src/models';

export default defineComponent({
  name: 'IndictmentDialogComponent',

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

  methods: {
    setCardIndictment(card: ICard) {
      switch (card.category) {
        case 'character':
          this.sessionStore.game.indictment.character = card.name;
          break;
        case 'weapon':
          this.sessionStore.game.indictment.weapon = card.name;
          break;
      }
    },
  },
});
</script>

<style scoped>
.indictment-card {
  width: 126px;
  height: 180px;
  opacity: 1;
  transition: all 0.3s;
}

.card-selected {
  transform: scale(115%);
  z-index: 1;
  pointer-events: none;
  touch-action: none;
  outline: 3px solid var(--q-primary);
}
</style>
