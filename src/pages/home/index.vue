<template>
  <q-page
    class="container shadow-21 row items-center justify-evenly q-pa-md"
    style="display: flex; align-items: center; flex-wrap: wrap"
  >
    <div class="config-icon absolute-right q-pa-md">
      <div class="relative-position" v-ripple>
        <q-icon
          class="spin cursor-pointer clue-text-shadow"
          color="info"
          style="opacity: 0.5"
          name="settings"
          size="32px"
          @click="openConfigDialog"
        />
      </div>
    </div>
    <div class="logo-container">
      <q-img class="shadow-21 logo" src="img/clue_logo.png"></q-img>
    </div>
    <div class="full-width column flex-center">
      <q-btn
        style="width: 100%"
        color="primary"
        label="Novo Jogo"
        @click="createNewGame"
      />
      <q-btn
        flat
        style="width: 100%"
        class="q-mt-sm shadow-21"
        color="primary"
        label="Entrar em uma sala"
        @click="openEnterRoomDialog"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSessionStore } from 'stores/session';
import { useLayoutStore } from 'stores/layout';
import { useFirebaseStore } from 'stores/firebase';
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  name: 'HomePage',

  setup() {
    const sessionStore = useSessionStore();
    const layoutStore = useLayoutStore();
    const firebaseStore = useFirebaseStore();

    return {
      sessionStore,
      layoutStore,
      firebaseStore,
    };
  },

  methods: {
    async createNewGame() {
      this.sessionStore.game.id = uuidv4();
      this.sessionStore.game.room = Math.random()
        .toString(36)
        .slice(-3)
        .toUpperCase();
      this.sessionStore.game.status = 'waiting';
      this.sessionStore.game.ownerId = this.sessionStore.user.id;

      this.layoutStore.loadingLayout = true;
      await this.firebaseStore
        .createGame(this.sessionStore.game)
        .then(() => {
          this.firebaseStore.realTimeGame(this.sessionStore.game.id);
          this.$router.push('/waiting-room');
        })
        .catch((error) => console.error(error));
      this.layoutStore.loadingLayout = false;
    },

    async enterRoom(room: string) {
      await this.firebaseStore
        .getGameByRoom(room)
        .then((response) => {
          if (response.length) {
            this.sessionStore.game = Object.assign({}, response[0]);
            this.firebaseStore.realTimeGame(this.sessionStore.game.id);
            this.$router.push('/waiting-room');
          } else {
            console.log('Sala não localizada!');
          }
        })
        .catch((error) => console.error(error));
    },

    openEnterRoomDialog() {
      this.$q
        .dialog({
          title: 'Entrar em um Sala',
          message: 'Digite o código da Sala',
          cancel: {
            flat: true,
            label: 'Cancelar',
          },
          prompt: {
            model: '',
            type: 'text',
          },
        })
        .onOk((data) => {
          this.enterRoom(data.toUpperCase());
        });
    },

    openConfigDialog() {
      this.$q
        .dialog({
          title: 'Configurações',
          message: 'Quantidade de Jogadores',
          options: {
            type: 'radio',
            model: this.sessionStore.game.qtdPlayers,
            inline: true,
            items: [
              { label: '2', value: 2 },
              { label: '3', value: 3 },
              { label: '6', value: 6 },
            ],
          },
          ok: true, // we want the user to not be able to close it
        })
        .onOk((data) => {
          this.sessionStore.game.qtdPlayers = data;
        });
    },
  },
});
</script>

<style scoped>
.logo-container {
  width: 500px;
  height: 200px;
}
</style>
