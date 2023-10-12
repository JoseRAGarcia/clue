<template>
  <router-view />
  <q-inner-loading
    class="z-max"
    :showing="layoutStore.loadingLayout"
    label="Carregando..."
    color="primary"
    label-style="font-size: 1.1em"
  />
  <ExitGameDialog />
</template>

<script lang="ts">
import ExitGameDialog from 'components/ExitGameDialog.vue';

import { defineComponent, ref } from 'vue';
import { useSessionStore } from 'stores/session';
import { useLayoutStore } from 'stores/layout';
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  name: 'App',

  setup() {
    const sessionStore = useSessionStore();
    const layoutStore = useLayoutStore();

    const userReady = ref(false);

    return {
      sessionStore,
      layoutStore,
      userReady,
    };
  },

  components: {
    ExitGameDialog,
  },

  mounted() {
    let userId = localStorage.getItem('userId');
    const game = localStorage.getItem('game');
    const playerSelected = localStorage.getItem('playerSelected');

    if (!userId) {
      userId = uuidv4();
      localStorage.setItem('userId', userId);
    }
    this.sessionStore.user.id = userId;

    if (playerSelected) {
      this.sessionStore.playerSelected = JSON.parse(playerSelected);
    }

    if (game) {
      this.sessionStore.game = JSON.parse(game);
      this.$router.push('/game');
    }
  },

  watch: {
    'sessionStore.game': {
      handler: function (novo) {
        if (novo.id) {
          localStorage.setItem('game', JSON.stringify(novo));
        } else {
          localStorage.removeItem('game');
        }
      },
      deep: true,
    },

    'sessionStore.playerSelected': {
      handler: function (novo) {
        localStorage.setItem('playerSelected', JSON.stringify(novo));
      },
      deep: true,
    },
  },
});
</script>
