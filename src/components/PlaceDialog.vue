<template>
  <q-dialog
    v-model="layoutStore.placeDialog"
    transition-show="scale"
    transition-hide="scale"
    full-height
    full-width
    style="z-index: 999"
  >
    <q-card
      class="q-dialog-plugin overflow-hidden"
      :style="`background: url(img/places/${sessionStore.game.place}.jpg) no-repeat;
  background-position: center; background-size: cover`"
    >
      <q-card-section class="q-dialog__title text-white clue-text-shadow">
        {{ placeNameComputed }}
      </q-card-section>
      <q-card-section class="q-dialog__message full-height full-width">
        <div class="characther-image q-pa-none" :style="loaded && 'left: 20%'">
          <img
            :src="`img/characters/${sessionStore.activePlayer.name}.png`"
            alt=""
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLayoutStore } from 'stores/layout';
import { useSessionStore } from 'stores/session';
import { useFirebaseStore } from 'stores/firebase';

export default defineComponent({
  name: 'PlaceDialogComponent',

  setup() {
    const layoutStore = useLayoutStore();
    const sessionStore = useSessionStore();
    const firebaseStore = useFirebaseStore();

    return {
      layoutStore,
      sessionStore,
      firebaseStore,
    };
  },

  data() {
    return {
      loaded: false,
    };
  },

  watch: {
    'layoutStore.placeDialog': function (novo) {
      setTimeout(() => {
        this.loaded = novo;
      }, 300);
    },
  },

  computed: {
    placeNameComputed() {
      switch (this.sessionStore.game.place) {
        case 'biblioteca':
          return 'Biblioteca';
        case 'cozinha':
          return 'Cozinha';
        case 'entrada':
          return 'Entrada';
        case 'escritorio':
          return 'Escritorio';
        case 'jardiminverno':
          return 'Jardim de Inverno';
        case 'salaestar':
          return 'Sala de Estar';
        case 'salajantar':
          return 'Sala de Jantar';
        case 'salamusica':
          return 'Sala de Música';
        case 'salaojogos':
          return 'Salão de Jogos';
        default:
          return '';
      }
    },
  },

  methods: {},
});
</script>

<style scoped>
.characther-image {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: -80%;
  transition: left 0.3s;
  pointer-events: none;
  touch-action: none;
}

.characther-image img {
  max-width: 100%;
  max-height: 100%;
}
</style>
