<template>
  <q-dialog
    v-model="layoutStore.exitGameDialog"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card>
      <q-card-section
        class="flex flex-center bg-primary text-white text-h6 q-pa-sm text-weight-bold"
      >
        <div class="text-h6" style="color: white">Sair do Jogo</div>
      </q-card-section>
      <q-card-section class="flex flex-center">
        <div class="text-subtitle1 clue-text-muted">Deseja sair do jogo?</div>
      </q-card-section>
      <q-card-actions class="flex justify-end">
        <q-btn
          flat
          autofocus
          color="primary"
          label="Não"
          @click="layoutStore.loadingLayout = false"
        />
        <q-btn flat color="primary" label="Sim" @click="exitGame" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLayoutStore } from 'stores/layout';
import { useSessionStore } from 'stores/session';

export default defineComponent({
  name: 'ExitGameDialogComponent',

  setup() {
    const layoutStore = useLayoutStore();
    const sessionStore = useSessionStore();

    return {
      layoutStore,
      sessionStore,
    };
  },

  methods: {
    async exitGame() {
      this.layoutStore.exitGameDialog = false;
      this.layoutStore.leftDrawerOpen = false;

      this.layoutStore.loadingLayout = true;

      setTimeout(() => {
        this.sessionStore.cleanGame();
        this.$router.push({ name: 'home' });
        this.layoutStore.loadingLayout = false;
      }, 1000);
    },
  },
});
</script>
