import { defineStore } from 'pinia'
import { KeepAwake } from '@capacitor-community/keep-awake';

export const usekeepAwakeStore = defineStore('keepAwake', {
  state: () => ({

  }),

  getters: {

  },

  actions: {
    async keepAwake() {
      await KeepAwake.keepAwake();
    },

    async allowSleep() {
      await KeepAwake.allowSleep();
    },

    async isSupported() {
      const result = await KeepAwake.isSupported();
      return result.isSupported;
    },

    async isKeptAwake() {
      const result = await KeepAwake.isKeptAwake();
      return result.isKeptAwake;
    },
  }
})
