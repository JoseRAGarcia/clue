<template>
  <q-dialog
    v-model="layoutStore.placeDialog"
    transition-show="scale"
    transition-hide="scale"
    full-width
    full-height
    persistent
    style="z-index: 999"
    maximized
  >
    <q-card
      class="q-dialog-plugin overflow-hidden"
      :style="`background: url(img/places/${sessionStore.game.indictment.place}.jpg) no-repeat;
  background-position: center; background-size: cover; width: 1200px !important;`"
    >
      <q-card-section class="q-dialog__title q-pa-none">
        <div class="clue-text-shadow text-white shadow-21 q-pa-md">
          {{ placeNameComputed }}
        </div>
      </q-card-section>
      <q-card-section class="q-dialog__message full-height full-width">
        <div class="row reverse">
          <div class="col col-12 col-sm-6 flex items-center">
            <div
              v-if="loaded"
              class="talk-balloon full-width q-pa-sm q-mt-md column"
            >
              <q-spinner-dots
                v-if="!sessionStore.game.indictment.indictment"
                color="dark"
                size="1.5rem"
              />
              <div
                v-else
                :class="{ 'subtitle2-size': $q.screen.xs || $q.screen.sm }"
              >
                <div class="clue-text-muted q-mb-sm">Eis minha acusação:</div>
                <div>
                  <span>Local do assasinato:</span>
                  <span class="text-primary text-bold q-ml-sm">{{
                    placeNameComputed
                  }}</span>
                </div>
                <div>
                  <span>Arma utilizada:</span>
                  <span v-if="!sessionStore.game.indictment.weapon">
                    <q-spinner-dots
                      color="dark"
                      size="1.5rem"
                      class="q-ma-sm"
                    />
                  </span>
                  <span v-else class="text-primary text-bold q-ml-sm"
                    >{{ weaponNameComputed }}
                  </span>
                  <span class="q-ml-sm">
                    <q-icon
                      v-if="isPlayer"
                      name="edit"
                      color="primary"
                      class="cursor-pointer"
                      v-ripple
                      @click="setIndictment('weapon')"
                    />
                    <q-spinner-hourglass
                      v-else-if="!sessionStore.game.indictment.weapon"
                      color="primary"
                      size="1em"
                    />
                  </span>
                </div>
                <div>
                  <span>Quem matou:</span>
                  <span v-if="!sessionStore.game.indictment.character">
                    <q-spinner-dots
                      color="dark"
                      size="1.5rem"
                      class="q-ma-sm"
                    />
                  </span>
                  <span
                    v-else
                    class="text-primary text-bold text-capitalize q-ml-sm"
                    >{{ sessionStore.game.indictment.character }}</span
                  >
                  <span class="q-ml-sm">
                    <q-icon
                      v-if="isPlayer"
                      name="edit"
                      color="primary"
                      class="cursor-pointer"
                      v-ripple
                      @click="setIndictment('character')"
                    />
                    <q-spinner-hourglass
                      v-else-if="!sessionStore.game.indictment.character"
                      color="primary"
                      size="1em"
                    />
                  </span>
                </div>
              </div>
              <div
                v-if="indictmentReady"
                class="q-mt-sm"
                :class="{ 'subtitle2-size': $q.screen.xs || $q.screen.sm }"
              >
                <template v-if="isPlayer">
                  <q-btn
                    v-if="!sessionStore.game.indictment.indictmentMade"
                    style="width: 100%"
                    color="primary"
                    label="Finalizar Acusação"
                    @click="sessionStore.game.indictment.indictmentMade = true"
                  />
                  <div v-else-if="!sessionStore.game.indictment.answerCardName">
                    <span
                      >Aguardando
                      <span class="text-primary text-bold text-capitalize">{{
                        answerPlayer.name
                      }}</span>
                      responder</span
                    >
                    <q-spinner-hourglass
                      color="primary"
                      size="1em"
                      class="q-ma-sm"
                    />
                  </div>
                </template>
                <template v-else>
                  <div v-if="!sessionStore.game.indictment.indictmentMade">
                    <span
                      >Aguardando
                      <span class="text-primary text-bold text-capitalize">{{
                        sessionStore.activePlayer.name
                      }}</span>
                      finalizar acusação</span
                    >
                  </div>
                  <div
                    v-else-if="
                      answerPlayer.id === sessionStore.playerSelected.id
                    "
                  >
                    <q-btn
                      style="width: 100%"
                      color="primary"
                      label="Mostrar Carta"
                    />
                  </div>
                  <div v-else-if="!sessionStore.game.indictment.answerCardName">
                    <span
                      >Aguardando
                      <span class="text-primary text-bold text-capitalize">{{
                        answerPlayer.name
                      }}</span>
                      responder</span
                    >
                    <q-spinner-hourglass
                      color="primary"
                      size="1em"
                      class="q-ma-sm"
                    />
                  </div>
                </template>
              </div>
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
              <q-btn
                style="width: 100%"
                color="primary"
                label="Acusar"
                @click="sessionStore.game.indictment.indictment = true"
              />
              <q-btn
                style="width: 100%"
                class="q-mt-sm shadow-21 clue-text-muted"
                color="white"
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
    <Component
      :is="IndictmentDialog"
      :indictmentCategory="indictmentCategory"
    />
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import { useLayoutStore } from 'stores/layout';
import { useSessionStore } from 'stores/session';
import { useFirebaseStore } from 'stores/firebase';
import { IIndictment } from 'src/models';

export default defineComponent({
  name: 'PlaceDialogComponent',

  setup() {
    const layoutStore = useLayoutStore();
    const sessionStore = useSessionStore();
    const firebaseStore = useFirebaseStore();
    const IndictmentDialog = defineAsyncComponent(
      () => import('components/IndictmentDialog.vue')
    );

    return {
      layoutStore,
      sessionStore,
      firebaseStore,
      IndictmentDialog,
    };
  },

  props: {
    isPlayer: Boolean,
  },

  data() {
    return {
      loaded: false,
      indictmentCategory: 'weapon',
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
      switch (this.sessionStore.game.indictment.place) {
        case 'biblioteca':
          return 'Biblioteca';
        case 'cozinha':
          return 'Cozinha';
        case 'entrada':
          return 'Entrada';
        case 'escritorio':
          return 'Escritório';
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

    weaponNameComputed() {
      switch (this.sessionStore.game.indictment.weapon) {
        case 'castical':
          return 'Castiçal';
        case 'corda':
          return 'Corda';
        case 'cano':
          return 'Cano';
        case 'revolver':
          return 'Revólver';
        case 'chaveinglesa':
          return 'Chave Inglesa';
        case 'faca':
          return 'Faca';
        default:
          return '';
      }
    },

    indictmentReady() {
      return (
        this.sessionStore.game.indictment.place &&
        this.sessionStore.game.indictment.character &&
        this.sessionStore.game.indictment.weapon
      );
    },

    answerPlayer() {
      return this.sessionStore.game.players.find(
        (p) => p.id === this.sessionStore.game.indictment.answerPlayerId
      );
    },
  },

  methods: {
    exitPlaceDialog() {
      this.sessionStore.game.indictment = {} as IIndictment;
      this.sessionStore.changeActivePlayer();
    },

    setIndictment(category: string) {
      this.indictmentCategory = category;
      this.layoutStore.indictmentDialog = true;
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
