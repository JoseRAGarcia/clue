<template>
  <q-page
    class="row items-center justify-evenly q-pa-md"
    style="display: flex; align-items: center; flex-wrap: wrap"
  >
    <div class="config-icon absolute-right q-pa-md">
      <div class="relative-position" v-ripple>
        <q-icon
          class="spin clue-text-muted cursor-pointer"
          name="settings"
          size="32px"
          @click="openConfigDialog"
        />
      </div>
    </div>
    <div class="full-width">
      <q-btn
        class="full-width"
        color="primary"
        label="Novo Jogo"
        @click="createNewGame"
      />
      <q-btn
        flat
        class="full-width q-mt-sm"
        color="primary"
        label="Entrar em uma sala"
        @click="enterNewRoom"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSessionStore } from 'stores/session';
import { useLayoutStore } from 'stores/layout';
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  name: 'HomePage',

  setup() {
    const sessionStore = useSessionStore();
    const layoutStore = useLayoutStore();

    return {
      sessionStore,
      layoutStore,
    };
  },

  methods: {
    createNewGame() {
      this.sessionStore.game.id = uuidv4();
      this.sessionStore.game.room = 'ABC';

      this.layoutStore.loadingLayout = true;
      setTimeout(() => {
        this.$router.push('/waiting-room');
        this.layoutStore.loadingLayout = false;
      }, 1000);
    },

    enterNewRoom() {
      console.log('enterNewRoom');
    },

    openConfigDialog() {
      this.$q
        .dialog({
          title: 'Configurações',
          message: 'Quantidade de Jogadores',
          options: {
            type: 'radio',
            model: this.sessionStore.game.qtdPlayers,
            // inline: true
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
