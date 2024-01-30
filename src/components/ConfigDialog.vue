<template>
  <q-dialog
    v-model="layoutStore.configDialog"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section class="q-dialog__title"> Configurações </q-card-section>
      <q-card-section class="q-dialog__message">
        <div class="text-size q-pb-sm">Quantidade de peões no tabuleiro</div>
        <q-btn-toggle
          spread
          v-model="configStore.pawnsQtd"
          color="light"
          text-color="dark"
          toggle-color="primary"
          toggle-text-color="white"
          rounded
          :options="[
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '6', value: 6 },
          ]"
        />
      </q-card-section>
      <q-separator />
      <q-card-section class="q-dialog__message">
        <div class="text-size q-pb-sm">Quantidade de dados</div>
        <q-btn-toggle
          disable
          spread
          v-model="configStore.doubleDice"
          color="light"
          text-color="dark"
          toggle-color="primary"
          toggle-text-color="white"
          rounded
          :options="[
            { label: '1', value: false },
            { label: '2', value: true },
          ]"
        />
      </q-card-section>
      <q-separator />
      <q-card-actions class="flex justify-end">
        <q-btn
          flat
          autofocus
          color="primary"
          label="Ok"
          @click="layoutStore.configDialog = false"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLayoutStore } from 'stores/layout';
import { useSessionStore } from 'stores/session';
import { useFirebaseStore } from 'stores/firebase';
import { useConfigStore } from 'stores/config';

export default defineComponent({
  name: 'ConfigDialogComponent',

  setup() {
    const layoutStore = useLayoutStore();
    const sessionStore = useSessionStore();
    const firebaseStore = useFirebaseStore();
    const configStore = useConfigStore();

    return {
      layoutStore,
      sessionStore,
      firebaseStore,
      configStore,
    };
  },

  methods: {},
});
</script>

<style lang="scss" scoped>
.config-card {
  background: #fff;
  border-radius: 5px;
}
</style>
