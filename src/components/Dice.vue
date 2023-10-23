<template>
  <div
    v-if="sessionStore.game.rollDice"
    class="dice-container"
    :style="`background: url(img/cards/${sessionStore.activePlayer.name}.jpg) no-repeat;
  background-position: center;`"
  >
    <input
      v-for="(num, index) in 36"
      :key="index"
      :class="`setA rollA${num}`"
      type="radio"
      name="die"
      :id="`rollA${num}`"
    />
    <input
      v-for="(num, index) in 36"
      :key="index"
      :class="`setB rollB${num}`"
      type="radio"
      name="die"
      :id="`rollB${num}`"
    />

    <div class="result">
      <div class="result-bg-wrapper result-bg-wrapperA">
        <div
          class="result-bg result-bgA"
          :style="`background: var(--${sessionStore.activePlayer.name}-color)`"
        ></div>
      </div>
      <div class="result-bg-wrapper result-bg-wrapperB">
        <div
          class="result-bg result-bgB"
          :style="`background: var(--${sessionStore.activePlayer.name}-color)`"
        ></div>
      </div>

      <div class="result-content">
        <div
          v-for="(num, index) in 11"
          :key="index"
          :class="`result-A${num + 1}`"
        >
          <span>{{ num + 1 }}</span>
        </div>
        <div
          v-for="(num, index) in 11"
          :key="index"
          :class="`result-B${num + 1}`"
        >
          <span>{{ num + 1 }}</span>
        </div>
      </div>
    </div>

    <div class="dice">
      <div class="die-wrapper die1">
        <div class="die">
          <div class="die-inner">
            <div class="face face1">
              <span class="pips-md"></span>
            </div>
            <div class="face face2">
              <span class="pips-tl"></span><span class="pips-br"></span>
            </div>
            <div class="face face3">
              <span class="pips-tl"></span><span class="pips-md"></span
              ><span class="pips-br"></span>
            </div>
            <div class="face face4">
              <span class="pips-tl"></span><span class="pips-tr"></span
              ><span class="pips-bl"></span><span class="pips-br"></span>
            </div>
            <div class="face face5">
              <span class="pips-tl"></span><span class="pips-tr"></span
              ><span class="pips-md"></span><span class="pips-bl"></span
              ><span class="pips-br"></span>
            </div>
            <div class="face face6">
              <span class="pips-tl"></span><span class="pips-tr"></span
              ><span class="pips-mdl"></span><span class="pips-mdr"></span
              ><span class="pips-bl"></span><span class="pips-br"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="die-wrapper die2">
        <div class="die">
          <div class="die-inner">
            <div class="face face1">
              <span class="pips-md"></span>
            </div>
            <div class="face face2">
              <span class="pips-tl"></span><span class="pips-br"></span>
            </div>
            <div class="face face3">
              <span class="pips-tl"></span><span class="pips-md"></span
              ><span class="pips-br"></span>
            </div>
            <div class="face face4">
              <span class="pips-tl"></span><span class="pips-tr"></span
              ><span class="pips-bl"></span><span class="pips-br"></span>
            </div>
            <div class="face face5">
              <span class="pips-tl"></span><span class="pips-tr"></span
              ><span class="pips-md"></span><span class="pips-bl"></span
              ><span class="pips-br"></span>
            </div>
            <div class="face face6">
              <span class="pips-tl"></span><span class="pips-tr"></span
              ><span class="pips-mdl"></span><span class="pips-mdr"></span
              ><span class="pips-bl"></span><span class="pips-br"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSessionStore } from 'stores/session';

export default defineComponent({
  name: 'DiceRollingComponent',

  setup() {
    const sessionStore = useSessionStore();

    return {
      sessionStore,
    };
  },

  mounted() {
    setTimeout(() => {
      this.roll();
    }, 500);
  },

  methods: {
    roll() {
      setTimeout(() => {
        // const randomNum = Math.floor(Math.random() * 36) + 1;
        const randomElA = document.querySelector(
          `.rollA${this.sessionStore.game.diceValue}`
        ) as HTMLElement;
        const randomElB = document.querySelector(
          `.rollB${this.sessionStore.game.diceValue}`
        ) as HTMLElement;

        if (randomElA) {
          randomElA.click();
        } else if (randomElB) {
          randomElB.click();
        }

        setTimeout(() => {
          this.getResult();
        }, 3000);
      });
    },

    getResult() {
      for (let i = 1; i <= 12; i++) {
        const elA = document.querySelector(`.result-A${i}`) as HTMLElement;
        const elB = document.querySelector(`.result-B${i}`) as HTMLElement;

        if (elA) {
          const opacity = getComputedStyle(elA).opacity;
          if (opacity == '1') {
            const span = elA.lastChild as HTMLElement;
            this.sessionStore.game.diceValue = Number(span.innerHTML);
          }
        }

        if (elB) {
          const opacity = getComputedStyle(elB).opacity;
          if (opacity == '1') {
            const span = elB.lastChild as HTMLElement;
            this.sessionStore.game.diceValue = Number(span.innerHTML);
          }
        }
      }

      setTimeout(() => {
        this.sessionStore.game.rollDice = false;
      }, 1000);
    },
  },
});
</script>

<style scoped lang="scss">
@import './dice-rolling-styles.scss';
</style>
