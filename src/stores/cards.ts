import { defineStore } from 'pinia';

export const useCardsStore = defineStore('cards', {
  state: () => ({
    characters: [
      { name: 'plum' },
      { name: 'scarlett' },
      { name: 'mustard' },
      { name: 'white' },
      { name: 'green' },
      { name: 'peacock' },
    ],
    weapons: [
      { name: 'cano' },
      { name: 'castical' },
      { name: 'chaveinglesa' },
      { name: 'corda' },
      { name: 'faca' },
      { name: 'revolver' },
    ],
    places: [
      { name: 'biblioteca' },
      { name: 'cozinha' },
      { name: 'entrada' },
      { name: 'escritorio' },
      { name: 'jardiminverno' },
      { name: 'salaestar' },
      { name: 'salajantar' },
      { name: 'salamusica' },
      { name: 'salaojogos' },
    ],
  }),

  getters: {

  },

  actions: {

  }
});
