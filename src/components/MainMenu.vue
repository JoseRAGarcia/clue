<template>
  <q-drawer
    side="right"
    class="z-max"
    overlay
    v-model="layoutStore.rightDrawerOpen"
    bordered
  >
    <q-list>
      <q-item v-ripple class="q-pa-none">
        <q-item-section>
          <div class="logo-container">
            <img src="img/clue_logo.png" alt="" />
          </div>
        </q-item-section>
      </q-item>
      <q-separator />

      <div>
        <q-item
          :disable="!item.activeInGame"
          v-for="(item, index) in menuComputed"
          :key="index"
          clickable
          v-ripple
          :to="item.isLink ? item.action : ''"
          @click="itemClick(item)"
        >
          <q-item-section
            avatar
            class="q-pr-sm"
            style="min-width: auto !important"
          >
            <q-icon
              rounded
              color="primary"
              text-color="white"
              :name="item.icon"
            />
          </q-item-section>
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </div>
      <q-item-label footer>
        <div style="padding: 1rem">
          <span class="text-teal" style="text-decoration: none"
            >© {{ new Date().getFullYear() }} clue</span
          >
        </div>
      </q-item-label>
    </q-list>
  </q-drawer>
</template>

<script>
import Menu from './Menu';
import { useLayoutStore } from 'stores/layout';
import { useSessionStore } from 'stores/session';

export default {
  setup() {
    const layoutStore = useLayoutStore();
    const sessionStore = useSessionStore();

    return {
      layoutStore,
      sessionStore,
    };
  },

  data: () => ({
    outGameDialog: false,
  }),

  computed: {
    menuComputed() {
      let menu = [];
      Menu.forEach((item) => {
        menu.push(item);
      });
      return menu;
    },
  },

  methods: {
    itemClick(item) {
      this.layoutStore.rightDrawerOpen = false;

      if (item.isLink) return;

      switch (item.action) {
        case 'cards':
          this.layoutStore.cardsDialog = true;
          break;
      }
    },
  },
};
</script>

<style scoped>
.logo-container {
  width: 299px;
  height: 64px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--clue-light);
}
.logo-container img {
  max-width: 100%;
  max-height: 100%;
}
</style>
