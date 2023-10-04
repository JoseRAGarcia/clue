<template>
  <q-dialog
    v-model="sessionStore.rollDice"
    transition-show="scale"
    transition-hide="scale"
    persistent
  >
    <DiceRolling />
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSessionStore } from 'stores/session';

import DiceRolling from 'components/DiceRolling.vue';

export default defineComponent({
  name: 'DiceDialogComponent',

  setup() {
    const sessionStore = useSessionStore();

    return {
      sessionStore,
    };
  },

  components: {
    DiceRolling,
  },
});
</script>
