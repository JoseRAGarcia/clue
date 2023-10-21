// @ts-nocheck

import { defineStore } from 'pinia';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  connectFirestoreEmulator,
} from 'firebase/firestore';
import { IUser, IGame } from "src/models"
import { useSessionStore } from 'stores/session';
import { characters, cards } from 'src/fake-backend';

export const useFirebaseStore = defineStore('firebase', {
  // https://www.npmjs.com/package/firebase
  // https://firebase.google.com/docs/firestore/query-data/listen?hl=pt-br
  state: () => ({
    app: null as any,
    analytics: null as any,
    db: null as any,
    rtUsers: null as any,
    rtGame: null as any,
  }),

  getters: {
  },

  actions: {
    initializeApp() {
      const config = {
        apiKey: "AIzaSyD5b75molGUQWmisLRXK-k9owkmyiTeLNU",
        authDomain: "clue-fde0b.firebaseapp.com",
        projectId: "clue-fde0b",
        storageBucket: "clue-fde0b.appspot.com",
        messagingSenderId: "860129738845",
        appId: "1:860129738845:web:2bcf447ef0f2d18630cdb4",
        measurementId: "G-M3VWF500XN"
      }

      this.app = initializeApp(config)
      this.initFirestore()
    },

    initFirestore() {
      if (location.hostname === 'localhost') {
        this.db = getFirestore();
        connectFirestoreEmulator(this.db, 'localhost', 8080)

        characters.forEach(character => {
          const docRef = doc(this.db, 'character', character.id);
          setDoc(docRef, character)
        })
        cards.forEach(card => {
          const docRef = doc(this.db, 'card', card.id);
          setDoc(docRef, card)
        })

      } else {
        this.db = getFirestore(this.app);
        cards.forEach(card => {
          const docRef = doc(this.db, 'card', card.id);
          setDoc(docRef, card)
        })
        this.initAnalytcs()
      }
    },

    initAnalytcs() {
      this.analytics = getAnalytics(this.app);
    },

    // User methods
    realTimeUsers(): void {
      const colRef = collection(this.db, 'user');

      this.rtUsers = onSnapshot(colRef, (snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
      });
    },

    async getUsers(): Promise<any[]> {
      const colRef = collection(this.db, 'user');
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map((doc) => doc.data());
    },

    async getUser(id: string): Promise<any | undefined> {
      const docRef = doc(this.db, 'user', id);
      const snapshot = await getDoc(docRef);
      return snapshot.data()
    },

    async createUser(user: IUser): Promise<void> {
      const docRef = doc(this.db, 'user', user.id);
      await setDoc(docRef, user)
    },

    async updateUser(user: IUser): Promise<void> {
      const docRef = doc(this.db, 'user', user.id);
      await updateDoc(docRef, user)
    },

    async deleteUser(id: string): Promise<void> {
      const docRef = doc(this.db, 'user', id);
      await deleteDoc(docRef);
    },

    // Character methods
    async getCharacters(): Promise<any[]> {
      const colRef = collection(this.db, 'character');
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map((doc) => doc.data());
    },

    // Cards methods
    async getCards(): Promise<any[]> {
      const colRef = collection(this.db, 'card');
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map((doc) => doc.data());
    },

    // Game methods
    realTimeGame(id: string): void {
      const sessionStore = useSessionStore();

      const docRef = doc(this.db, 'game', id);

      this.rtGame = onSnapshot(docRef, (snapshot) => {
        if (snapshot.data()?.id) {
          sessionStore.game = Object.assign({}, snapshot.data())
          if (!sessionStore.user.gameId) {
            sessionStore.user.gameId = sessionStore.game.id
            this.updateUser(sessionStore.user)
          }
        } else {
          sessionStore.cleanGame()
          this.rtGame()
        }
        console.log('game', sessionStore.game);
      });
    },

    async getGames(): Promise<any[]> {
      const colRef = collection(this.db, 'game');
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map((doc) => doc.data());
    },

    async getGame(id: string): Promise<any | undefined> {
      const docRef = doc(this.db, 'game', id);
      const snapshot = await getDoc(docRef);
      return snapshot.data()
    },

    async getGameByRoom(room: string): Promise<any[]> {
      const q = query(collection(this.db, "game"), where("room", "==", room));

      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data());
    },

    async createGame(game: IGame): Promise<void> {
      const docRef = doc(this.db, 'game', game.id);
      await setDoc(docRef, game)
    },

    async updateGame(game: IGame): Promise<void> {
      const docRef = doc(this.db, 'game', game.id);
      await updateDoc(docRef, game)
    },

    async deleteGame(id: string): Promise<void> {
      const docRef = doc(this.db, 'game', id);
      await deleteDoc(docRef);
    },
  },
});
