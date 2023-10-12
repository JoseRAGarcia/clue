<template>
  <q-page> oi </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSessionStore } from 'stores/session';

export default defineComponent({
  name: 'WaitingRoom',

  setup() {
    const sessionStore = useSessionStore();

    return {
      sessionStore,
    };
  },
});
</script>
