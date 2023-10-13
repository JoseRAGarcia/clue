<template>
  <q-dialog
    v-model="layoutStore.exitGameDialog"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section class="q-dialog__title"> Sair do Jogo </q-card-section>
      <q-card-section class="q-dialog__message">
        Deseja sair do jogo?
      </q-card-section>
      <q-card-actions class="flex justify-end">
        <q-btn
          flat
          autofocus
          color="primary"
          label="Não"
          @click="layoutStore.exitGameDialog = false"
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
      this.layoutStore.rightDrawerOpen = false;

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
