<template>
  <q-dialog
    v-model="layoutStore.cardsToShowDialog"
    transition-show="scale"
    transition-hide="scale"
    persistent
  >
    <q-card class="q-dialog-plugin">
      <q-card-section class="q-dialog__title flex justify-between">
        Escolha uma Carta para Mostrar
        <span class="text-primary">{{ timer }}</span>
      </q-card-section>
      <q-card-section class="q-dialog__message">
        <div class="indictment-container">
          <div
            class="indictment-card cursor-pointer relative-position"
            v-for="card in cardsToShow"
            :key="card.id"
            v-ripple
            @click="setShowCard(card)"
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
import { defineComponent, ref } from 'vue';
import { useLayoutStore } from 'stores/layout';
import { useSessionStore } from 'stores/session';
import { ICard } from 'src/models';

export default defineComponent({
  name: 'CardsToShowDialogComponent',

  setup() {
    const layoutStore = useLayoutStore();
    const sessionStore = useSessionStore();
    const timer = ref(10);

    return {
      layoutStore,
      sessionStore,
      timer,
    };
  },

  props: {
    cardsToShow: {
      type: Array,
      required: true,
    },
    showCard: Function,
  },

  methods: {
    setShowCard(card: ICard) {
      this.showCard && this.showCard(card);
      this.layoutStore.cardsToShowDialog = false;
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
</style>
