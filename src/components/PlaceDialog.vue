<template>
  <q-dialog
    v-model="layoutStore.placeDialog"
    transition-show="slide-left"
    transition-hide="slide-right"
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
                <div class="text-no-wrap">
                  <span>Local:</span>
                  <span class="text-primary text-bold q-ml-sm">{{
                    placeNameComputed
                  }}</span>
                </div>
                <div class="text-no-wrap">
                  <span>Arma:</span>
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
                      v-if="
                        isPlayer && !sessionStore.game.indictment.indictmentMade
                      "
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
                <div class="text-no-wrap">
                  <span>Assassino:</span>
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
                      v-if="
                        isPlayer && !sessionStore.game.indictment.indictmentMade
                      "
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
                <div
                  class="answers-list text-size text-no-wrap full-width q-ma-md"
                >
                  <div
                    v-for="(answer, index) in sessionStore.game.indictment
                      .answersList"
                    :key="index"
                    class="q-pa-sm text-white q-mb-sm text-center full-width flex flex-center"
                    :class="answer.answered ? 'bg-negative' : 'bg-positive'"
                    style="border-radius: 25px"
                  >
                    <q-icon
                      class="q-mr-sm"
                      :name="answer.answered ? 'close' : 'check'"
                    />
                    {{ answer.text }}
                  </div>
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
                    @click="finishIndictment(sessionStore.activePlayer.id)"
                  />
                  <div v-else-if="ownCard">
                    <div class="text-size text-negative text-center">
                      Ninguém apresentou nenhuma carta, mas você possui, pelo
                      menos, uma das cartas que você usou na acusação!
                    </div>
                    <q-btn
                      style="width: 100%"
                      class="q-mt-sm"
                      color="primary"
                      label="OK"
                      @click="exitPlaceDialog"
                    />
                  </div>
                  <div
                    v-else-if="!sessionStore.game.indictment.answerCardName"
                    class="text-center"
                  >
                    <span
                      >Aguardando
                      <span class="text-primary text-bold text-capitalize">{{
                        answerPlayer?.name
                      }}</span>
                      responder</span
                    >
                    <q-spinner-hourglass
                      color="primary"
                      size="1em"
                      class="q-ma-sm"
                    />
                  </div>
                  <div v-else class="text-center">
                    <div>
                      <span class="text-primary text-bold text-capitalize">{{
                        answerPlayer?.name
                      }}</span>
                      apresentou a seguinte carta:
                    </div>
                    <div class="full-width bg-light q-pa-sm flex flex-center">
                      <div class="indictment-card relative-position">
                        <q-img
                          height="100%"
                          width="100%"
                          :src="`img/cards/${sessionStore.game.indictment.answerCardName}.jpg`"
                        ></q-img>
                      </div>
                    </div>

                    <q-btn
                      style="width: 100%"
                      class="q-mt-sm"
                      color="primary"
                      label="OK"
                      @click="acceptCard"
                    />
                  </div>
                </template>
                <template v-else>
                  <div
                    v-if="!sessionStore.game.indictment.indictmentMade"
                    class="text-center"
                  >
                    <span
                      >Aguardando
                      <span class="text-primary text-bold text-capitalize">{{
                        sessionStore.activePlayer.name
                      }}</span>
                      finalizar acusação</span
                    >
                  </div>
                  <div v-else-if="checkingCards" class="text-center">
                    <span
                      v-if="answerPlayer.id === sessionStore.playerSelected.id"
                      >Checando as suas cartas...</span
                    >
                    <span v-else>
                      <span class="text-primary text-bold text-capitalize">{{
                        answerPlayer?.name
                      }}</span>
                      está checando as suas cartas...</span
                    >
                    <q-spinner-hourglass
                      color="primary"
                      size="1em"
                      class="q-ma-sm"
                    />
                  </div>
                  <div
                    v-else-if="!sessionStore.game.indictment.answerCardName"
                    class="text-center"
                  >
                    <span
                      >Aguardando
                      <span class="text-primary text-bold text-capitalize">{{
                        answerPlayer?.name
                      }}</span>
                      responder</span
                    >
                    <q-spinner-hourglass
                      color="primary"
                      size="1em"
                      class="q-ma-sm"
                    />
                  </div>
                  <div v-else class="text-center">
                    <span
                      >Aguardando a ação de
                      <span class="text-primary text-bold text-capitalize">{{
                        sessionStore.activePlayer.name
                      }}</span></span
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
                v-if="!sessionStore.game.indictment.indictment"
                style="width: 100%"
                color="primary"
                label="Acusar"
                @click="initIndictment"
              />
              <q-btn
                style="width: 100%"
                class="q-mt-sm shadow-21 clue-text-muted"
                color="white"
                label="Sair"
                @click="exitPlaceDialog"
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
    <Component
      :is="CardsToShowDialog"
      :cardsToShow="cardsToShow"
      :showCard="showCard"
    />
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import { useLayoutStore } from 'stores/layout';
import { useSessionStore } from 'stores/session';
import { useFirebaseStore } from 'stores/firebase';
import { ICard, IIndictment } from 'src/models';

export default defineComponent({
  name: 'PlaceDialogComponent',

  setup() {
    const layoutStore = useLayoutStore();
    const sessionStore = useSessionStore();
    const firebaseStore = useFirebaseStore();
    const IndictmentDialog = defineAsyncComponent(
      () => import('components/IndictmentDialog.vue')
    );
    const CardsToShowDialog = defineAsyncComponent(
      () => import('components/CardsToShowDialog.vue')
    );

    return {
      layoutStore,
      sessionStore,
      firebaseStore,
      IndictmentDialog,
      CardsToShowDialog,
    };
  },

  props: {
    isPlayer: Boolean,
    isOwner: Boolean,
  },

  data() {
    return {
      loaded: false,
      indictmentCategory: 'weapon',
      checkingCards: false,
      ownCard: false,
      cardsToShow: [] as ICard[],
      cardShown: {} as ICard,
    };
  },

  watch: {
    'layoutStore.placeDialog': function (novo) {
      setTimeout(() => {
        this.loaded = novo;

        if (novo) {
          setTimeout(() => {
            this.checkNpc();
          }, 1000);
        }
      }, 1000);
    },

    'sessionStore.game.indictment.answerPlayerId': function (novo) {
      if (
        (this.answerPlayer?.isNpc ||
          novo === this.sessionStore.playerSelected.id) &&
        !this.sessionStore.game.indictment.answerCardName
      ) {
        this.checkCards();
      }
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
    checkNpc() {
      if (!this.sessionStore.activePlayer.isNpc || !this.isOwner) return;

      this.initIndictment();

      const characters: ICard[] = [];
      const weapons: ICard[] = [];

      this.sessionStore.cards.forEach((card) => {
        if (
          card.category === 'character' &&
          this.sessionStore.activePlayer.checklist.every(
            (c) => c.id !== card.id
          )
        ) {
          characters.push(card);
        }
        if (
          card.category === 'weapon' &&
          this.sessionStore.activePlayer.checklist.every(
            (c) => c.id !== card.id
          )
        ) {
          weapons.push(card);
        }
      });

      setTimeout(() => {
        const weaponRandomIndex = Math.floor(Math.random() * weapons.length);
        this.sessionStore.game.indictment.weapon =
          weapons[weaponRandomIndex]?.name;

        setTimeout(() => {
          const characterRandomIndex = Math.floor(
            Math.random() * characters.length
          );
          this.sessionStore.game.indictment.character =
            characters[characterRandomIndex]?.name;

          setTimeout(() => {
            this.finishIndictment(this.sessionStore.activePlayer.id);
          }, 2000);
        }, 2000);
      }, 2000);
    },

    exitPlaceDialog() {
      this.sessionStore.game.indictment = {} as IIndictment;
      this.sessionStore.changeActivePlayer();
    },

    initIndictment() {
      this.sessionStore.game.indictment.indictment = true;
      this.sessionStore.game.indictment.indictmentMade = false;
      this.sessionStore.game.indictment.character = '';
      this.sessionStore.game.indictment.weapon = '';
      this.sessionStore.game.indictment.answerPlayerId = '';
      this.sessionStore.game.indictment.answerCardName = '';
      this.sessionStore.game.indictment.answersList = [];
      this.ownCard = false;
      this.cardShown = {} as ICard;
    },

    setIndictment(category: string) {
      this.indictmentCategory = category;
      this.layoutStore.indictmentDialog = true;
    },

    finishIndictment(playerId: string) {
      this.sessionStore.game.indictment.indictmentMade = true;
      this.sessionStore.setAnswerPlayerId(playerId);
    },

    acceptCard() {
      this.layoutStore.checklistDialog = true;

      setTimeout(() => {
        this.sessionStore.activePlayer.checklist.push(this.cardShown);

        setTimeout(() => {
          this.layoutStore.checklistDialog = false;
          this.exitPlaceDialog();
        }, 1000);
      }, 500);
    },

    checkCards() {
      this.cardsToShow = [];
      const player = this.answerPlayer;

      if (player) {
        if (player.isNpc && !this.isOwner) return;

        player.cards.forEach((card) => {
          if (
            card.name === this.sessionStore.game.indictment.place ||
            card.name === this.sessionStore.game.indictment.weapon ||
            card.name === this.sessionStore.game.indictment.character
          ) {
            this.cardsToShow.push(card);
          }
        });

        this.checkingCards = true;
        setTimeout(() => {
          if (!this.cardsToShow.length) {
            if (player.id === this.sessionStore.activePlayer.id) {
              this.sessionStore.game.indictment.answersList.push({
                answered: false,
                text: `${
                  player.name.charAt(0).toUpperCase() + player.name.slice(1)
                } venceu a partida!`,
              });
              this.sessionStore.game.winnerId = player.id;
            } else {
              this.sessionStore.game.indictment.answersList.push({
                answered: false,
                text: `${
                  player.name.charAt(0).toUpperCase() + player.name.slice(1)
                } não tem nada a dizer!`,
              });
              this.sessionStore.setAnswerPlayerId(player.id);
            }
          } else if (player.isNpc) {
            if (player.id === this.sessionStore.activePlayer.id) {
              this.ownCard = true;
            } else {
              const cardRandomIndex = Math.floor(
                Math.random() * this.cardsToShow.length
              );
              this.showCard(this.cardsToShow[cardRandomIndex]);
            }
          } else {
            if (player.id === this.sessionStore.activePlayer.id) {
              this.ownCard = true;
            } else {
              this.layoutStore.cardsToShowDialog = true;
            }
          }
          this.checkingCards = false;
        }, 1500);
      } else {
        setTimeout(() => {
          this.checkingCards = false;
        }, 3000);
      }
    },

    showCard(card: ICard) {
      if (this.answerPlayer?.isNpc && !this.isOwner) return;

      if (this.answerPlayer?.name) {
        this.sessionStore.game.indictment.answersList.push({
          answered: true,
          text: `${
            this.answerPlayer.name.charAt(0).toUpperCase() +
            this.answerPlayer.name.slice(1)
          } mostrou uma carta!`,
        });
      }

      this.sessionStore.game.indictment.answerCardName = card.name;
      this.cardShown = card;

      if (this.sessionStore.activePlayer.isNpc) {
        setTimeout(() => {
          this.exitPlaceDialog();
        }, 2000);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.characther-image {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 50px;
  left: -90%;
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
  background: rgba(#fff, 0.9);
  min-width: 150px;
  border-radius: 25px;
  border: 3px solid var(--q-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  z-index: 1;
  overflow: hidden;
}

.indictment-card {
  width: 91px;
  height: 128px;
  opacity: 1;
  transition: all 0.3s;
}
</style>
