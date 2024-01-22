<template>
  <q-dialog
    v-model="layoutStore.checklistDialog"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section class="q-dialog__title">Checklist</q-card-section>
      <q-card-section class="q-dialog__message">
        <div class="characters-container">
          <div class="text-h6 text-primary">Personagens</div>
          <div
            class="character-card"
            v-for="(checklist, index) in characterChecklist"
            :key="index"
          >
            <div
              class="full-width flex items-center justify-between q-pa-xs"
              :style="index % 2 == 0 && `background: var(--clue-light)`"
            >
              <span class="text-subtitle1">{{ checklist.name }}</span>
              <span>
                <q-checkbox
                  disable
                  color="teal"
                  size="xs"
                  v-model="checklist.checklist"
                />
                <q-checkbox
                  :style="
                    checklist.checklist && 'opacity: 0; pointer-events: none;'
                  "
                  keep-color
                  color="teal"
                  checked-icon="help"
                  unchecked-icon="help_outline"
                  v-model="checklist.suspicious"
                />
              </span>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="weapon-container">
          <div class="text-h6 text-primary">Armas</div>
          <div
            class="weapon-card"
            v-for="(checklist, index) in weaponChecklist"
            :key="index"
          >
            <div
              class="full-width flex items-center justify-between q-pa-xs"
              :style="index % 2 == 0 && `background: var(--clue-light)`"
            >
              <span class="text-subtitle1">{{ checklist.name }}</span>
              <span>
                <q-checkbox
                  disable
                  color="teal"
                  size="xs"
                  v-model="checklist.checklist"
                />
                <q-checkbox
                  :style="
                    checklist.checklist && 'opacity: 0; pointer-events: none;'
                  "
                  keep-color
                  color="teal"
                  checked-icon="help"
                  unchecked-icon="help_outline"
                  v-model="checklist.suspicious"
                />
              </span>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="place-container">
          <div class="text-h6 text-primary">Cômodos</div>
          <div
            class="place-card"
            v-for="(checklist, index) in placeChecklist"
            :key="index"
          >
            <div
              class="full-width flex items-center justify-between q-pa-xs"
              :style="index % 2 == 0 && `background: var(--clue-light)`"
            >
              <span class="text-subtitle1">{{ checklist.name }}</span>
              <span>
                <q-checkbox
                  disable
                  color="teal"
                  size="xs"
                  v-model="checklist.checklist"
                />
                <q-checkbox
                  :style="
                    checklist.checklist && 'opacity: 0; pointer-events: none;'
                  "
                  keep-color
                  color="teal"
                  checked-icon="help"
                  unchecked-icon="help_outline"
                  v-model="checklist.suspicious"
                />
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
  suspicious?: boolean;
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

  mounted() {
    this.sessionStore.cards.forEach((card) => {
      if (card.category === 'character') {
        this.characterChecklist.push({
          ...card,
          checklist: this.myPlayer?.checklist.some((c) => c.id === card.id),
          suspicious: this.myPlayer?.suspicious.some((c) => c.id === card.id),
        });
      } else if (card.category === 'weapon') {
        this.weaponChecklist.push({
          ...card,
          checklist: this.myPlayer?.checklist.some((c) => c.id === card.id),
          suspicious: this.myPlayer?.suspicious.some((c) => c.id === card.id),
        });
      } else if (card.category === 'place') {
        this.placeChecklist.push({
          ...card,
          checklist: this.myPlayer?.checklist.some((c) => c.id === card.id),
          suspicious: this.myPlayer?.suspicious.some((c) => c.id === card.id),
        });
      }
    });
  },

  data() {
    return {
      characterChecklist: [] as IChecklist[],
      weaponChecklist: [] as IChecklist[],
      placeChecklist: [] as IChecklist[],
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
    setSuspicious(checklist: IChecklist) {
      console.log(checklist);
    },
  },
});
</script>

<style scoped>
</style>
