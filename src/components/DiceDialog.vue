<template>
  <q-dialog
    v-model="sessionStore.rollDice"
    transition-show="scale"
    transition-hide="scale"
    persistent
    full-width
  >
    <component :is="Dice" />
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import { useSessionStore } from 'stores/session';

export default defineComponent({
  name: 'DiceDialogComponent',

  setup() {
    const sessionStore = useSessionStore();

    const Dice = defineAsyncComponent(() => import('components/Dice.vue'));

    return {
      sessionStore,
      Dice,
    };
  },
});
</script>
