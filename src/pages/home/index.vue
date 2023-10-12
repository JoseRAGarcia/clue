<template>
  <div
    class="window-height q-pa-md bg-dark"
    style="display: flex; align-items: center; flex-wrap: wrap"
  >
    <div class="full-width">
      <q-btn
        class="full-width"
        color="teal"
        label="Iniciar Jogo"
        to="/waiting-room"
      />
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
