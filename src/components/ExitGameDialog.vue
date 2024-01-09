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
import { useFirebaseStore } from 'stores/firebase';

export default defineComponent({
  name: 'ExitGameDialogComponent',

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

  methods: {
    async exitGame() {
      this.layoutStore.exitGameDialog = false;
      this.layoutStore.rightDrawerOpen = false;

      const nonNpcPLayers = this.sessionStore.game.players.filter(
        (p) => !p.isNpc
      );

      if (!nonNpcPLayers.length || nonNpcPLayers.length === 1) {
        this.layoutStore.loadingLayout = true;
        await this.firebaseStore
          .deleteGame(this.sessionStore.game.id)
          .then(() => {
            this.$router.push({ name: 'home' });
          });
        this.layoutStore.loadingLayout = false;
      } else {
        const playerInGameIndex: number =
          this.sessionStore.game.players.findIndex(
            (p) => p.id === this.sessionStore.playerSelected?.id
          );

        if (playerInGameIndex >= 0) {
          this.sessionStore.game.players[playerInGameIndex].isNpc = true;

          if (this.sessionStore.game.ownerId === this.sessionStore.user.id) {
            const nonNpcPLayer = this.sessionStore.game.players.find(
              (p) => !p.isNpc
            );

            if (nonNpcPLayer) {
              this.sessionStore.game.ownerId =
                nonNpcPLayer.userId.split('/user/')[1];
            }
          }

          this.firebaseStore.updateGame(this.sessionStore.game);
          this.firebaseStore.rtGame();
          this.sessionStore.cleanGame();
          this.$router.push({ name: 'home' });
        }
      }
    },
  },
});
</script>
