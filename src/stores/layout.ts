import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    loadingLayout: false,
    rightDrawerOpen: false,
    exitGameDialog: false,
    helpDialog: false,
    cardsDialog: false,
    checklistDialog: false,
    placeDialog: false,
    indictmentDialog: false,
  }),

  getters: {

  },

  actions: {

  }
});
