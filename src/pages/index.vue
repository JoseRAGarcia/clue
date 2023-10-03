<template>
  <div
    class="window-height q-pa-md bg-dark"
    style="display: flex; align-items: center; flex-wrap: wrap"
  >
    <div
      class="full-width"
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      "
    >
      <q-radio
        class="text-bold text-white"
        color="teal"
        checked-icon="task_alt"
        unchecked-icon="panorama_fish_eye"
        v-for="(player, index) in sessionStore.players"
        :key="index"
        :label="player.name"
        :val="player"
        v-model="sessionStore.playerSelected"
      />
    </div>
    <div class="full-width">
      <q-btn class="full-width" color="teal" label="Iniciar Jogo" to="/game" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSessionStore } from 'stores/session';

export default defineComponent({
  name: 'HomePage',

  setup() {
    const sessionStore = useSessionStore();

    return {
      sessionStore,
    };
  },
});
</script>
