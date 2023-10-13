<template>
  <q-layout view="lHh Lpr lFf">
    <q-btn
      class="menu-btn clue-text-shadow"
      flat
      dense
      round
      color="primary"
      :icon="layoutStore.rightDrawerOpen ? 'close' : 'menu'"
      aria-label="Menu"
      :style="`transition: all 0.4s; right: ${
        layoutStore.rightDrawerOpen ? '300px;' : '10px;'
      }`"
      @click="toggleRightDrawer"
    />
    <MainMenu />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLayoutStore } from 'stores/layout';

import MainMenu from 'components/MainMenu.vue';

export default defineComponent({
  name: 'GameLayout',

  setup() {
    const layoutStore = useLayoutStore();

    return {
      layoutStore,
      toggleRightDrawer() {
        layoutStore.rightDrawerOpen = !layoutStore.rightDrawerOpen;
      },
    };
  },

  components: {
    MainMenu,
  },
});
</script>

<style scoped>
.menu-btn {
  position: fixed;
  top: 15px;
  z-index: 3000;
}
</style>
