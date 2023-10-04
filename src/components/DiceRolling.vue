<template lang="pug">
.container
  each _, i in Array(36)
    input.setA(class='rollA' + (i + 1), type='radio', name='die', id='rollA' + (i + 1))
    input.setB(class='rollB' + (i + 1), type='radio', name='die', id='rollB' + (i + 1))
  //- .rollBtn
  //-   .rollBtn-inner
  //-     .rollBtn-blocker
  //-     .labels-set.labels-setA
  //-       each _, i in Array(36)
  //-         label(for='rollA' + (i + 1))
  //-     .labels-set.labels-setB
  //-       each _, i in Array(36)
  //-         label(for='rollB' + (i + 1))
  //-     .rollBtn-text Roll the Dice
  .result
    .result-bg-wrapper.result-bg-wrapperA
      .result-bg.result-bgA
    .result-bg-wrapper.result-bg-wrapperB
      .result-bg.result-bgB
    .result-content
      - for (let i = 2; i <= 12; i++)
        div(class='result-A' + i)
          span #{ i }
        div(class='result-B' + i)
          span #{ i }
  .dice
    each _, i in Array(2)
      .die-wrapper(class='die' + (i + 1))
        .die
          .die-inner
            .face.face1
              span.pips-md
            .face.face2
              span.pips-tl
              span.pips-br
            .face.face3
              span.pips-tl
              span.pips-md
              span.pips-br
            .face.face4
              span.pips-tl
              span.pips-tr
              span.pips-bl
              span.pips-br
            .face.face5
              span.pips-tl
              span.pips-tr
              span.pips-md
              span.pips-bl
              span.pips-br
            .face.face6
              span.pips-tl
              span.pips-tr
              span.pips-mdl
              span.pips-mdr
              span.pips-bl
              span.pips-br
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
