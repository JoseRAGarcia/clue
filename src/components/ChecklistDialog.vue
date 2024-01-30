<template>
  <q-dialog
    v-model="layoutStore.checklistDialog"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section
        class="q-dialog__title flex items-center justify-between q-pa-sm bg-light q-mb-sm"
        >Checklist
        <q-icon
          v-ripple
          class="relative-position cursor-pointer"
          name="close"
          @click="layoutStore.checklistDialog = false"
        />
      </q-card-section>
      <q-card-section class="q-dialog__message scroll" style="max-height: 70vh">
        <div
          v-show="showCharacterContainer"
          class="characters-container q-mt-md"
        >
          <q-toolbar class="bg-primary text-white">
            <q-toolbar-title> Personagens </q-toolbar-title>
          </q-toolbar>
          <div
            class="character-card checklist-card"
            :class="{ 'name-to-check z-max': nameToCheck === checklist.name }"
            v-for="(checklist, index) in characterChecklist"
            :key="index"
          >
            <div
              class="full-width flex items-center justify-between q-pa-xs"
              :style="
                index % 2 == 0
                  ? `background: var(--clue-light)`
                  : `background: #fff`
              "
            >
              <span class="subtitle2-size text-capitalize checklist-name">
                <div
                  class="strike"
                  :class="{ 'strike-100': checklist.checklist }"
                ></div>
                <span
                  :style="checklist.checklist && 'opacity: 0.5;'"
                  :id="checklist.name"
                  >{{ checklist.name }}</span
                >
              </span>
            </div>
          </div>
        </div>
        <q-separator />
        <div v-show="showWeaponContainer" class="weapon-container q-mt-md">
          <q-toolbar class="bg-primary text-white">
            <q-toolbar-title> Armas </q-toolbar-title>
          </q-toolbar>
          <div
            class="weapon-card checklist-card"
            :class="{ 'name-to-check z-max': nameToCheck === checklist.name }"
            v-for="(checklist, index) in weaponChecklist"
            :key="index"
          >
            <div
              class="full-width flex items-center justify-between q-pa-xs"
              :style="
                index % 2 == 0
                  ? `background: var(--clue-light)`
                  : `background: #fff`
              "
            >
              <span class="subtitle2-size text-capitalize checklist-name">
                <div
                  class="strike"
                  :class="{ 'strike-100': checklist.checklist }"
                ></div>
                <span
                  :style="checklist.checklist && 'opacity: 0.5;'"
                  :id="checklist.name"
                  >{{ weaponName(checklist.name) }}</span
                >
              </span>
            </div>
          </div>
        </div>
        <q-separator />
        <div v-show="showPlaceContainer" class="place-container q-mt-md">
          <q-toolbar class="bg-primary text-white">
            <q-toolbar-title> Cômodos </q-toolbar-title>
          </q-toolbar>
          <div
            class="place-card checklist-card"
            :class="{ 'name-to-check z-max': nameToCheck === checklist.name }"
            v-for="(checklist, index) in placeChecklist"
            :key="index"
          >
            <div
              class="full-width flex items-center justify-between q-pa-xs"
              :style="
                index % 2 == 0
                  ? `background: var(--clue-light)`
                  : `background: #fff`
              "
            >
              <span class="subtitle2-size text-capitalize checklist-name">
                <div
                  class="strike"
                  :class="{ 'strike-100': checklist.checklist }"
                ></div>
                <span
                  :style="checklist.checklist && 'opacity: 0.5;'"
                  :id="checklist.name"
                  >{{ placeName(checklist.name) }}</span
                >
              </span>
            </div>
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

interface IChecklist {
  id: string;
  name: string;
  category: string;
  checklist?: boolean;
}

export default defineComponent({
  name: 'ChecklistDialogComponent',

  setup() {
    const layoutStore = useLayoutStore();
    const sessionStore = useSessionStore();

    return {
      layoutStore,
      sessionStore,
    };
  },

  data() {
    return {
      characterChecklist: [] as IChecklist[],
      weaponChecklist: [] as IChecklist[],
      placeChecklist: [] as IChecklist[],

      showCharacterContainer: true,
      showWeaponContainer: true,
      showPlaceContainer: true,
      nameToCheck: '',
    };
  },

  watch: {
    'myPlayer.checklist': {
      handler: function () {
        this.checkChecklist();
      },
      deep: true,
      immediate: true,
    },

    'layoutStore.checklistDialog': function (novo) {
      this.showCharacterContainer = true;
      this.showWeaponContainer = true;
      this.showPlaceContainer = true;
      this.nameToCheck = '';

      if (novo && this.sessionStore.game.indictment.answerCardName) {
        const characters = this.sessionStore.cards.filter(
          (c) => c.category === 'character'
        );
        const weapons = this.sessionStore.cards.filter(
          (c) => c.category === 'weapon'
        );
        const places = this.sessionStore.cards.filter(
          (c) => c.category === 'place'
        );

        this.showCharacterContainer = characters.some(
          (c) => c.name === this.sessionStore.game.indictment.answerCardName
        );
        this.showWeaponContainer = weapons.some(
          (c) => c.name === this.sessionStore.game.indictment.answerCardName
        );
        this.showPlaceContainer = places.some(
          (c) => c.name === this.sessionStore.game.indictment.answerCardName
        );

        setTimeout(() => {
          this.nameToCheck = this.sessionStore.game.indictment.answerCardName;
        }, 500);
      }
    },
  },

  computed: {
    myPlayer() {
      return this.sessionStore.game.players.find(
        (p) => p.id === this.sessionStore.playerSelected.id
      );
    },
  },

  methods: {
    checkChecklist() {
      this.characterChecklist = [];
      this.weaponChecklist = [];
      this.placeChecklist = [];

      this.sessionStore.cards.forEach((card) => {
        if (card.category === 'character') {
          this.characterChecklist.push({
            ...card,
            checklist: this.myPlayer?.checklist.some((c) => c.id === card.id),
          });
        } else if (card.category === 'weapon') {
          this.weaponChecklist.push({
            ...card,
            checklist: this.myPlayer?.checklist.some((c) => c.id === card.id),
          });
        } else if (card.category === 'place') {
          this.placeChecklist.push({
            ...card,
            checklist: this.myPlayer?.checklist.some((c) => c.id === card.id),
          });
        }
      });
    },

    placeName(place: string) {
      switch (place) {
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

    weaponName(weapon: string) {
      switch (weapon) {
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
  },
});
</script>

<style lang="scss" scoped>
.checklist-name {
  position: relative;
  padding-bottom: 2px;
}

.strike {
  content: '';
  background: var(--q-negative);
  position: absolute;
  bottom: 50%;
  left: -5px;
  height: 2px;
  width: 0;
  transform: translateY(50%);
  transition: width 0.5s;
}

.strike-100 {
  width: 120%;
}

.checklist-card {
  transition: all 0.5s;
  transform-origin: left;
}
.name-to-check {
  background: var(-q-primary) !important;
  border: 1px solid #ccc;
  transform: scale(150%);
}
</style>
