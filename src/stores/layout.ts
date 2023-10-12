import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    loadingLayout: false,
    leftDrawerOpen: false,
    exitGameDialog: false,
    helpDialog: false,
  }),

  getters: {

  },

  actions: {

  }
});
