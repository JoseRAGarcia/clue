<template>
  <div
    v-if="sessionStore.rollDice"
    data-v-669c1b9e=""
    class="container"
    :style="`background: url(./src/assets/img/cards/${sessionStore.activePlayer.name}.jpg) no-repeat;
  background-position: center;`"
  >
    <input
      class="setA rollA1"
      type="radio"
      name="die"
      id="rollA1"
      data-v-669c1b9e=""
    /><input
      class="setB rollB1"
      type="radio"
      name="die"
      id="rollB1"
      data-v-669c1b9e=""
    /><input
      class="setA rollA2"
      type="radio"
      name="die"
      id="rollA2"
      data-v-669c1b9e=""
    /><input
      class="setB rollB2"
      type="radio"
      name="die"
      id="rollB2"
      data-v-669c1b9e=""
    /><input
      class="setA rollA3"
      type="radio"
      name="die"
      id="rollA3"
      data-v-669c1b9e=""
    /><input
      class="setB rollB3"
      type="radio"
      name="die"
      id="rollB3"
      data-v-669c1b9e=""
    /><input
      class="setA rollA4"
      type="radio"
      name="die"
      id="rollA4"
      data-v-669c1b9e=""
    /><input
      class="setB rollB4"
      type="radio"
      name="die"
      id="rollB4"
      data-v-669c1b9e=""
    /><input
      class="setA rollA5"
      type="radio"
      name="die"
      id="rollA5"
      data-v-669c1b9e=""
    /><input
      class="setB rollB5"
      type="radio"
      name="die"
      id="rollB5"
      data-v-669c1b9e=""
    /><input
      class="setA rollA6"
      type="radio"
      name="die"
      id="rollA6"
      data-v-669c1b9e=""
    /><input
      class="setB rollB6"
      type="radio"
      name="die"
      id="rollB6"
      data-v-669c1b9e=""
    /><input
      class="setA rollA7"
      type="radio"
      name="die"
      id="rollA7"
      data-v-669c1b9e=""
    /><input
      class="setB rollB7"
      type="radio"
      name="die"
      id="rollB7"
      data-v-669c1b9e=""
    /><input
      class="setA rollA8"
      type="radio"
      name="die"
      id="rollA8"
      data-v-669c1b9e=""
    /><input
      class="setB rollB8"
      type="radio"
      name="die"
      id="rollB8"
      data-v-669c1b9e=""
    /><input
      class="setA rollA9"
      type="radio"
      name="die"
      id="rollA9"
      data-v-669c1b9e=""
    /><input
      class="setB rollB9"
      type="radio"
      name="die"
      id="rollB9"
      data-v-669c1b9e=""
    /><input
      class="setA rollA10"
      type="radio"
      name="die"
      id="rollA10"
      data-v-669c1b9e=""
    /><input
      class="setB rollB10"
      type="radio"
      name="die"
      id="rollB10"
      data-v-669c1b9e=""
    /><input
      class="setA rollA11"
      type="radio"
      name="die"
      id="rollA11"
      data-v-669c1b9e=""
    /><input
      class="setB rollB11"
      type="radio"
      name="die"
      id="rollB11"
      data-v-669c1b9e=""
    /><input
      class="setA rollA12"
      type="radio"
      name="die"
      id="rollA12"
      data-v-669c1b9e=""
    /><input
      class="setB rollB12"
      type="radio"
      name="die"
      id="rollB12"
      data-v-669c1b9e=""
    /><input
      class="setA rollA13"
      type="radio"
      name="die"
      id="rollA13"
      data-v-669c1b9e=""
    /><input
      class="setB rollB13"
      type="radio"
      name="die"
      id="rollB13"
      data-v-669c1b9e=""
    /><input
      class="setA rollA14"
      type="radio"
      name="die"
      id="rollA14"
      data-v-669c1b9e=""
    /><input
      class="setB rollB14"
      type="radio"
      name="die"
      id="rollB14"
      data-v-669c1b9e=""
    /><input
      class="setA rollA15"
      type="radio"
      name="die"
      id="rollA15"
      data-v-669c1b9e=""
    /><input
      class="setB rollB15"
      type="radio"
      name="die"
      id="rollB15"
      data-v-669c1b9e=""
    /><input
      class="setA rollA16"
      type="radio"
      name="die"
      id="rollA16"
      data-v-669c1b9e=""
    /><input
      class="setB rollB16"
      type="radio"
      name="die"
      id="rollB16"
      data-v-669c1b9e=""
    /><input
      class="setA rollA17"
      type="radio"
      name="die"
      id="rollA17"
      data-v-669c1b9e=""
    /><input
      class="setB rollB17"
      type="radio"
      name="die"
      id="rollB17"
      data-v-669c1b9e=""
    /><input
      class="setA rollA18"
      type="radio"
      name="die"
      id="rollA18"
      data-v-669c1b9e=""
    /><input
      class="setB rollB18"
      type="radio"
      name="die"
      id="rollB18"
      data-v-669c1b9e=""
    /><input
      class="setA rollA19"
      type="radio"
      name="die"
      id="rollA19"
      data-v-669c1b9e=""
    /><input
      class="setB rollB19"
      type="radio"
      name="die"
      id="rollB19"
      data-v-669c1b9e=""
    /><input
      class="setA rollA20"
      type="radio"
      name="die"
      id="rollA20"
      data-v-669c1b9e=""
    /><input
      class="setB rollB20"
      type="radio"
      name="die"
      id="rollB20"
      data-v-669c1b9e=""
    /><input
      class="setA rollA21"
      type="radio"
      name="die"
      id="rollA21"
      data-v-669c1b9e=""
    /><input
      class="setB rollB21"
      type="radio"
      name="die"
      id="rollB21"
      data-v-669c1b9e=""
    /><input
      class="setA rollA22"
      type="radio"
      name="die"
      id="rollA22"
      data-v-669c1b9e=""
    /><input
      class="setB rollB22"
      type="radio"
      name="die"
      id="rollB22"
      data-v-669c1b9e=""
    /><input
      class="setA rollA23"
      type="radio"
      name="die"
      id="rollA23"
      data-v-669c1b9e=""
    /><input
      class="setB rollB23"
      type="radio"
      name="die"
      id="rollB23"
      data-v-669c1b9e=""
    /><input
      class="setA rollA24"
      type="radio"
      name="die"
      id="rollA24"
      data-v-669c1b9e=""
    /><input
      class="setB rollB24"
      type="radio"
      name="die"
      id="rollB24"
      data-v-669c1b9e=""
    /><input
      class="setA rollA25"
      type="radio"
      name="die"
      id="rollA25"
      data-v-669c1b9e=""
    /><input
      class="setB rollB25"
      type="radio"
      name="die"
      id="rollB25"
      data-v-669c1b9e=""
    /><input
      class="setA rollA26"
      type="radio"
      name="die"
      id="rollA26"
      data-v-669c1b9e=""
    /><input
      class="setB rollB26"
      type="radio"
      name="die"
      id="rollB26"
      data-v-669c1b9e=""
    /><input
      class="setA rollA27"
      type="radio"
      name="die"
      id="rollA27"
      data-v-669c1b9e=""
    /><input
      class="setB rollB27"
      type="radio"
      name="die"
      id="rollB27"
      data-v-669c1b9e=""
    /><input
      class="setA rollA28"
      type="radio"
      name="die"
      id="rollA28"
      data-v-669c1b9e=""
    /><input
      class="setB rollB28"
      type="radio"
      name="die"
      id="rollB28"
      data-v-669c1b9e=""
    /><input
      class="setA rollA29"
      type="radio"
      name="die"
      id="rollA29"
      data-v-669c1b9e=""
    /><input
      class="setB rollB29"
      type="radio"
      name="die"
      id="rollB29"
      data-v-669c1b9e=""
    /><input
      class="setA rollA30"
      type="radio"
      name="die"
      id="rollA30"
      data-v-669c1b9e=""
    /><input
      class="setB rollB30"
      type="radio"
      name="die"
      id="rollB30"
      data-v-669c1b9e=""
    /><input
      class="setA rollA31"
      type="radio"
      name="die"
      id="rollA31"
      data-v-669c1b9e=""
    /><input
      class="setB rollB31"
      type="radio"
      name="die"
      id="rollB31"
      data-v-669c1b9e=""
    /><input
      class="setA rollA32"
      type="radio"
      name="die"
      id="rollA32"
      data-v-669c1b9e=""
    /><input
      class="setB rollB32"
      type="radio"
      name="die"
      id="rollB32"
      data-v-669c1b9e=""
    /><input
      class="setA rollA33"
      type="radio"
      name="die"
      id="rollA33"
      data-v-669c1b9e=""
    /><input
      class="setB rollB33"
      type="radio"
      name="die"
      id="rollB33"
      data-v-669c1b9e=""
    /><input
      class="setA rollA34"
      type="radio"
      name="die"
      id="rollA34"
      data-v-669c1b9e=""
    /><input
      class="setB rollB34"
      type="radio"
      name="die"
      id="rollB34"
      data-v-669c1b9e=""
    /><input
      class="setA rollA35"
      type="radio"
      name="die"
      id="rollA35"
      data-v-669c1b9e=""
    /><input
      class="setB rollB35"
      type="radio"
      name="die"
      id="rollB35"
      data-v-669c1b9e=""
    /><input
      class="setA rollA36"
      type="radio"
      name="die"
      id="rollA36"
      data-v-669c1b9e=""
    /><input
      class="setB rollB36"
      type="radio"
      name="die"
      id="rollB36"
      data-v-669c1b9e=""
    />
    <div class="result" data-v-669c1b9e="">
      <div class="result-bg-wrapper result-bg-wrapperA" data-v-669c1b9e="">
        <div
          class="result-bg result-bgA"
          :style="`background: var(--${sessionStore.activePlayer.name}-color)`"
          data-v-669c1b9e=""
        ></div>
      </div>
      <div class="result-bg-wrapper result-bg-wrapperB" data-v-669c1b9e="">
        <div
          class="result-bg result-bgB"
          :style="`background: var(--${sessionStore.activePlayer.name}-color)`"
          data-v-669c1b9e=""
        ></div>
      </div>
      <div class="result-content" data-v-669c1b9e="">
        <div class="result-A2" data-v-669c1b9e="">
          <span data-v-669c1b9e="">2</span>
        </div>
        <div class="result-B2" data-v-669c1b9e="">
          <span data-v-669c1b9e="">2</span>
        </div>
        <div class="result-A3" data-v-669c1b9e="">
          <span data-v-669c1b9e="">3</span>
        </div>
        <div class="result-B3" data-v-669c1b9e="">
          <span data-v-669c1b9e="">3</span>
        </div>
        <div class="result-A4" data-v-669c1b9e="">
          <span data-v-669c1b9e="">4</span>
        </div>
        <div class="result-B4" data-v-669c1b9e="">
          <span data-v-669c1b9e="">4</span>
        </div>
        <div class="result-A5" data-v-669c1b9e="">
          <span data-v-669c1b9e="">5</span>
        </div>
        <div class="result-B5" data-v-669c1b9e="">
          <span data-v-669c1b9e="">5</span>
        </div>
        <div class="result-A6" data-v-669c1b9e="">
          <span data-v-669c1b9e="">6</span>
        </div>
        <div class="result-B6" data-v-669c1b9e="">
          <span data-v-669c1b9e="">6</span>
        </div>
        <div class="result-A7" data-v-669c1b9e="">
          <span data-v-669c1b9e="">7</span>
        </div>
        <div class="result-B7" data-v-669c1b9e="">
          <span data-v-669c1b9e="">7</span>
        </div>
        <div class="result-A8" data-v-669c1b9e="">
          <span data-v-669c1b9e="">8</span>
        </div>
        <div class="result-B8" data-v-669c1b9e="">
          <span data-v-669c1b9e="">8</span>
        </div>
        <div class="result-A9" data-v-669c1b9e="">
          <span data-v-669c1b9e="">9</span>
        </div>
        <div class="result-B9" data-v-669c1b9e="">
          <span data-v-669c1b9e="">9</span>
        </div>
        <div class="result-A10" data-v-669c1b9e="">
          <span data-v-669c1b9e="">10</span>
        </div>
        <div class="result-B10" data-v-669c1b9e="">
          <span data-v-669c1b9e="">10</span>
        </div>
        <div class="result-A11" data-v-669c1b9e="">
          <span data-v-669c1b9e="">11</span>
        </div>
        <div class="result-B11" data-v-669c1b9e="">
          <span data-v-669c1b9e="">11</span>
        </div>
        <div class="result-A12" data-v-669c1b9e="">
          <span data-v-669c1b9e="">12</span>
        </div>
        <div class="result-B12" data-v-669c1b9e="">
          <span data-v-669c1b9e="">12</span>
        </div>
      </div>
    </div>
    <div class="dice" data-v-669c1b9e="">
      <div class="die-wrapper die1" data-v-669c1b9e="">
        <div class="die" data-v-669c1b9e="">
          <div class="die-inner" data-v-669c1b9e="">
            <div class="face face1" data-v-669c1b9e="">
              <span class="pips-md" data-v-669c1b9e=""></span>
            </div>
            <div class="face face2" data-v-669c1b9e="">
              <span class="pips-tl" data-v-669c1b9e=""></span
              ><span class="pips-br" data-v-669c1b9e=""></span>
            </div>
            <div class="face face3" data-v-669c1b9e="">
              <span class="pips-tl" data-v-669c1b9e=""></span
              ><span class="pips-md" data-v-669c1b9e=""></span
              ><span class="pips-br" data-v-669c1b9e=""></span>
            </div>
            <div class="face face4" data-v-669c1b9e="">
              <span class="pips-tl" data-v-669c1b9e=""></span
              ><span class="pips-tr" data-v-669c1b9e=""></span
              ><span class="pips-bl" data-v-669c1b9e=""></span
              ><span class="pips-br" data-v-669c1b9e=""></span>
            </div>
            <div class="face face5" data-v-669c1b9e="">
              <span class="pips-tl" data-v-669c1b9e=""></span
              ><span class="pips-tr" data-v-669c1b9e=""></span
              ><span class="pips-md" data-v-669c1b9e=""></span
              ><span class="pips-bl" data-v-669c1b9e=""></span
              ><span class="pips-br" data-v-669c1b9e=""></span>
            </div>
            <div class="face face6" data-v-669c1b9e="">
              <span class="pips-tl" data-v-669c1b9e=""></span
              ><span class="pips-tr" data-v-669c1b9e=""></span
              ><span class="pips-mdl" data-v-669c1b9e=""></span
              ><span class="pips-mdr" data-v-669c1b9e=""></span
              ><span class="pips-bl" data-v-669c1b9e=""></span
              ><span class="pips-br" data-v-669c1b9e=""></span>
            </div>
          </div>
        </div>
      </div>
      <div class="die-wrapper die2" data-v-669c1b9e="">
        <div class="die" data-v-669c1b9e="">
          <div class="die-inner" data-v-669c1b9e="">
            <div class="face face1" data-v-669c1b9e="">
              <span class="pips-md" data-v-669c1b9e=""></span>
            </div>
            <div class="face face2" data-v-669c1b9e="">
              <span class="pips-tl" data-v-669c1b9e=""></span
              ><span class="pips-br" data-v-669c1b9e=""></span>
            </div>
            <div class="face face3" data-v-669c1b9e="">
              <span class="pips-tl" data-v-669c1b9e=""></span
              ><span class="pips-md" data-v-669c1b9e=""></span
              ><span class="pips-br" data-v-669c1b9e=""></span>
            </div>
            <div class="face face4" data-v-669c1b9e="">
              <span class="pips-tl" data-v-669c1b9e=""></span
              ><span class="pips-tr" data-v-669c1b9e=""></span
              ><span class="pips-bl" data-v-669c1b9e=""></span
              ><span class="pips-br" data-v-669c1b9e=""></span>
            </div>
            <div class="face face5" data-v-669c1b9e="">
              <span class="pips-tl" data-v-669c1b9e=""></span
              ><span class="pips-tr" data-v-669c1b9e=""></span
              ><span class="pips-md" data-v-669c1b9e=""></span
              ><span class="pips-bl" data-v-669c1b9e=""></span
              ><span class="pips-br" data-v-669c1b9e=""></span>
            </div>
            <div class="face face6" data-v-669c1b9e="">
              <span class="pips-tl" data-v-669c1b9e=""></span
              ><span class="pips-tr" data-v-669c1b9e=""></span
              ><span class="pips-mdl" data-v-669c1b9e=""></span
              ><span class="pips-mdr" data-v-669c1b9e=""></span
              ><span class="pips-bl" data-v-669c1b9e=""></span
              ><span class="pips-br" data-v-669c1b9e=""></span>
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
        const randomNum = Math.floor(Math.random() * 36) + 1;
        const randomElA = document.querySelector(
          `.rollA${randomNum}`
        ) as HTMLElement;
        const randomElB = document.querySelector(
          `.rollB${randomNum}`
        ) as HTMLElement;

        if (randomElA) {
          randomElA.click();
        } else if (randomElB) {
          randomElB.click();
        } else {
          console.log('not found');
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
            this.sessionStore.diceValue = Number(span.innerHTML);
          }
        } else {
          console.log('not found A');
        }

        if (elB) {
          const opacity = getComputedStyle(elB).opacity;
          if (opacity == '1') {
            const span = elB.lastChild as HTMLElement;
            this.sessionStore.diceValue = Number(span.innerHTML);
          }
        } else {
          console.log('not found B');
        }
      }

      setTimeout(() => {
        this.sessionStore.rollDice = false;
      }, 1000);
    },
  },
});
</script>

<style scoped lang="scss">
@import './dice-rolling-styles.scss';
</style>
