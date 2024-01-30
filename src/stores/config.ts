import { IConfig } from './../models/index';
import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', {
  state: () => ({
    pawnsQtd: 3,
    doubleDice: true,
  }),

  getters: {

  },

  actions: {
    setSavedConfig() {
      const savedConfig = localStorage.getItem('config')

      if (savedConfig) {
        this.$state = JSON.parse(savedConfig) as IConfig
      }
    }
  }
});
