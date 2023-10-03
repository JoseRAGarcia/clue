<template>
  <div
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PlayerComponent',
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
</style>
