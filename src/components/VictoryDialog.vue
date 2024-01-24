<template>
  <q-dialog
    v-model="layoutStore.victoryDialog"
    transition-show="scale"
    transition-hide="scale"
    persistent
  >
    <q-card class="q-dialog-plugin" style="width: 1200px !important">
      <q-card-section
        class="q-dialog__title flex items-center justify-between q-pa-sm bg-light q-mb-sm"
      >
        Fim de Jogo
      </q-card-section>
      <q-card-section class="q-dialog__message">
        <div>
          <span class="text-primary text-bold text-capitalize">
            {{ winnerPlayer.name }}
          </span>
          é o vencedor!
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn
          class="q-mt-sm full-width"
          color="primary"
          label="Novo Jogo"
          @click="finishGame"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLayoutStore } from 'stores/layout';
import { useSessionStore } from 'stores/session';

export default defineComponent({
  name: 'VictoryDialogComponent',

  setup() {
    const layoutStore = useLayoutStore();
    const sessionStore = useSessionStore();

    return {
      layoutStore,
      sessionStore,
    };
  },

  computed: {
    winnerPlayer() {
      return this.sessionStore.game.players.find(
        (p) => p.id === this.sessionStore.game.winnerId
      );
    },
  },

  methods: {
    finishGame() {
      this.sessionStore.game.status = 'finished';
    },
  },
});
</script>
