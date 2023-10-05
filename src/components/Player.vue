<template>
  <q-avatar
    v-if="floor === playerPosition"
    class="player"
    :id="playerName"
    :style="`background: var(--${playerName}-color)`"
  >
    <div
      class="shadow-10"
      style="
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid #ccc;
      "
    ></div>
    <q-badge
      v-if="
        sessionStore.activePlayer.name === playerName &&
        sessionStore.diceValue &&
        !sessionStore.rollDice
      "
      floating
      color="positive"
      class="transparent"
      style="right: -15px; top: -15px"
    >
      <div
        class="steps-left clue-text-shadow"
        :style="`color: var(--${playerName}-color)`"
      >
        {{ sessionStore.diceValue }}
      </div>
    </q-badge>
  </q-avatar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSessionStore } from 'stores/session';

export default defineComponent({
  name: 'PlayerComponent',

  setup() {
    const sessionStore = useSessionStore();

    return {
      sessionStore,
    };
  },

  props: {
    playerName: {
      type: String,
      required: true,
    },
    playerPosition: {
      type: Number,
      default: 0,
    },
    floor: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<style scoped>
.player {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s;
  z-index: 1;
}
.player-moving {
  transform: scale(105%) translate(-50%, -50%);
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
}

.steps-left {
  position: absolute;
  font-size: 3rem;
  font-weight: 600;
  z-index: 1;
  pointer-events: none;
  touch-action: none;
  opacity: 0.8;
}
</style>
