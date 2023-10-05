<template>
  <q-dialog
    v-model="sessionStore.rollDice"
    transition-show="scale"
    transition-hide="scale"
    persistent
    full-width
  >
    <Dice />
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSessionStore } from 'stores/session';

import Dice from 'components/Dice.vue';

export default defineComponent({
  name: 'DiceDialogComponent',

  setup() {
    const sessionStore = useSessionStore();

    return {
      sessionStore,
    };
  },

  components: {
    Dice,
  },
});
</script>
