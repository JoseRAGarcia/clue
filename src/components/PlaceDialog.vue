<template>
  <q-dialog
    v-model="layoutStore.placeDialog"
    transition-show="scale"
    transition-hide="scale"
    full-height
    full-width
    persistent
    style="z-index: 999"
  >
    <q-card
      class="q-dialog-plugin overflow-hidden"
      :style="`background: url(img/places/${sessionStore.game.place.place}.jpg) no-repeat;
  background-position: center; background-size: cover`"
    >
      <q-card-section class="q-dialog__title q-pa-none">
        <div class="clue-text-shadow text-white shadow-21 q-pa-md">
          {{ placeNameComputed.replace('no ', '').replace('na ', '') }}
        </div>
      </q-card-section>
      <q-card-section class="q-dialog__message full-height full-width">
        <div class="row reverse">
          <div class="col col-12 col-sm-6 flex items-center">
            <div
              v-if="loaded"
              class="talk-balloon full-width q-pa-sm q-mt-md column"
            >
              <div v-if="indictmentReady">
                Eu acredito que o crime tenha ocorrido aqui
                <span class="text-primary text-bold">{{
                  placeNameComputed
                }}</span>
                pelo<span class="text-primary text-bold text-capitalize">{{
                  sessionStore.game.place.character
                }}</span>
                com a<span class="text-primary text-bold text-capitalize">{{
                  sessionStore.game.place.weapon
                }}</span>
              </div>
              <q-spinner-dots color="dark" size="1rem" />
            </div>
          </div>
          <div class="col col-12 col-sm-6"></div>
        </div>
        <div
          v-if="isPlayer"
          class="row full-width absolute-bottom z-top q-px-md"
          style="bottom: 100px"
        >
          <div class="col">
            <div class="full-width column flex-center">
              <q-btn style="width: 100%" color="primary" label="Acusar" />
              <q-btn
                flat
                style="width: 100%"
                class="q-mt-sm shadow-21"
                color="primary"
                label="Sair"
                @click="this.exitPlaceDialog"
              />
            </div>
          </div>
        </div>
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
import { IPlace } from 'src/models';

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

  props: {
    isPlayer: Boolean,
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
      }, 1000);
    },
  },

  computed: {
    placeNameComputed() {
      switch (this.sessionStore.game.place.place) {
        case 'biblioteca':
          return 'na Biblioteca';
        case 'cozinha':
          return 'na Cozinha';
        case 'entrada':
          return 'na Entrada';
        case 'escritorio':
          return 'no Escritório';
        case 'jardiminverno':
          return 'Jardim de Inverno';
        case 'salaestar':
          return 'na Sala de Estar';
        case 'salajantar':
          return 'na Sala de Jantar';
        case 'salamusica':
          return 'na Sala de Música';
        case 'salaojogos':
          return 'no Salão de Jogos';
        default:
          return '';
      }
    },

    indictmentReady() {
      return (
        this.sessionStore.game.place.indictment &&
        this.sessionStore.game.place.character &&
        this.sessionStore.game.place.weapon
      );
    },
  },

  methods: {
    exitPlaceDialog() {
      this.sessionStore.game.place = {} as IPlace;
      this.sessionStore.changeActivePlayer();
    },
  },
});
</script>

<style scoped>
.characther-image {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 50px;
  left: -80%;
  transition: left 0.8s;
  pointer-events: none;
  touch-action: none;
  display: flex;
  align-items: flex-end;
}

.characther-image img {
  max-width: 100%;
  max-height: 100%;
}

.talk-balloon {
  background: #fff;
  min-width: 150px;
  border-radius: 25px;
  border: 3px solid var(--q-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}
</style>
