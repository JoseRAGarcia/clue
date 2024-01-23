<template>
  <q-dialog
    v-model="layoutStore.indictmentDialog"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section class="q-dialog__title flex justify-between"
        >Escolha {{ categoryComputed }}
        <q-icon
          v-ripple
          class="relative-position cursor-pointer"
          name="close"
          @click="layoutStore.indictmentDialog = false"
        />
      </q-card-section>
      <q-card-section class="q-dialog__message">
        <div class="indictment-container">
          <div
            class="indictment-card cursor-pointer relative-position"
            :class="{
              'card-selected shadow-21':
                sessionStore.game.indictment[indictmentCategory] === card.name,
            }"
            v-for="card in sessionStore.cards.filter(
              (c) => c.category === indictmentCategory
            )"
            :key="card.id"
            v-ripple
            @click="setCardIndictment(card)"
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

  props: {
    indictmentCategory: {
      type: String,
      required: true,
    },
  },

  computed: {
    myPlayer() {
      return this.sessionStore.game.players.find(
        (p) => p.id === this.sessionStore.playerSelected.id
      );
    },

    categoryComputed() {
      switch (this.indictmentCategory) {
        case 'weapon':
          return 'a Arma';
        case 'character':
          return 'o Assassino';
        default:
          return '';
      }
    },
  },

  methods: {
    setCardIndictment(card: ICard) {
      switch (this.indictmentCategory) {
        case 'weapon':
          this.sessionStore.game.indictment.weapon = card.name;
          break;
        case 'character':
          this.sessionStore.game.indictment.character = card.name;
          break;
      }
      this.layoutStore.indictmentDialog = false;
    },
  },
});
</script>

<style scoped>
.indictment-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 128px);
  grid-gap: 25px;
  margin: 0 auto;
  justify-content: center;
}

.indictment-card {
  width: 91px;
  height: 128px;
  opacity: 1;
  transition: all 0.3s;
}

.card-selected {
  transform: scale(115%);
  z-index: 1;
  pointer-events: none;
  touch-action: none;
}
</style>
