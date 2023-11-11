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
import { useFirebaseStore } from 'stores/firebase';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './models';

export default defineComponent({
  name: 'App',

  setup() {
    const sessionStore = useSessionStore();
    const layoutStore = useLayoutStore();
    const firebaseStore = useFirebaseStore();

    const userReady = ref(false);

    return {
      sessionStore,
      layoutStore,
      userReady,
      firebaseStore,
    };
  },

  components: {
    ExitGameDialog,
  },

  async mounted() {
    await this.firebaseStore.getCards().then((response) => {
      this.sessionStore.cards = Array.from(response);
    });

    let userId: any = localStorage.getItem('userId');

    if (!userId) {
      userId = uuidv4();
      localStorage.setItem('userId', userId);
    }
    this.sessionStore.user.id = userId;

    const user: IUser | undefined = await this.firebaseStore.getUser(
      this.sessionStore.user.id
    );

    if (user) {
      this.sessionStore.user = user;
    } else {
      this.sessionStore.user.name = 'Player';
      this.firebaseStore.createUser(this.sessionStore.user);
    }

    const playerSelected = localStorage.getItem('playerSelected');

    if (playerSelected) {
      this.sessionStore.playerSelected = JSON.parse(playerSelected);
    }

    if (this.sessionStore.user.gameId) {
      await this.firebaseStore
        .getGame(this.sessionStore.user.gameId)
        .then((response) => {
          if (response.id) {
            this.sessionStore.game = Object.assign({}, response);
            this.firebaseStore.realTimeGame(this.sessionStore.game.id);
            if (this.sessionStore.game.status === 'waiting') {
              this.$router.push('/waiting-room');
            } else if (this.sessionStore.game.status === 'started') {
              this.$router.push('/game');
            }
          }
        });
    }
  },

  watch: {
    'sessionStore.playerSelected': {
      handler: function (novo) {
        localStorage.setItem('playerSelected', JSON.stringify(novo));
      },
      deep: true,
    },
  },
});
</script>
