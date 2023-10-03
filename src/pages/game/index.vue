<template>
  <div>
    <div class="board">
      <div
        class="floor"
        :class="{ 'floor-markers': showMarkers }"
        v-for="(item, index) in 600"
        :key="index"
      >
        <span :class="{ hidden: !showMarkers }">
          Floor <br />
          {{ index }}
        </span>

        <template v-for="(player, j) in sessionStore.players" :key="j">
          <Player
            :playerName="player.name"
            :floor="index"
            :playerPosition="player.playerPosition"
          />
        </template>

        <!-- <div v-if="playerPosition === index" class="player">
          <div
            class="shadow-10"
            style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 1px solid #ccc;
            "
          ></div>
        </div> -->
      </div>

      <div class="places">
        <div class="place stairway solid" :class="{ hidden: !showMarkers }">
          Stairway
        </div>
        <div class="place study solid" :class="{ hidden: !showMarkers }">
          Study
        </div>
        <div class="place hall solid" :class="{ hidden: !showMarkers }">
          Hall
        </div>
        <div class="place lounge solid" :class="{ hidden: !showMarkers }">
          Lounge
        </div>
        <div class="place library solid" :class="{ hidden: !showMarkers }">
          Library
        </div>
        <div class="place dinning solid" :class="{ hidden: !showMarkers }">
          Dinning Room
        </div>
        <div class="place billiard solid" :class="{ hidden: !showMarkers }">
          Billiard Room
        </div>
        <div class="place conservatory solid" :class="{ hidden: !showMarkers }">
          Conservatory
        </div>
        <div class="place ballroom solid" :class="{ hidden: !showMarkers }">
          Ball Room
        </div>
        <div class="place kitchen solid" :class="{ hidden: !showMarkers }">
          Kitchen
        </div>
      </div>

      <div
        class="control-pad"
        :class="{
          'control-pad-disabled':
            sessionStore.activePlayer.name !== sessionStore.playerSelected.name,
        }"
      >
        <div class="row full-width">
          <div
            v-ripple
            class="col relative-position"
            id="up"
            style="
              height: 110px;
              width: 110px;
              border: 2px solid var(--q-secondary);
              border-left: none;
            "
            @click="padMovePlayer('up')"
          ></div>
          <div
            v-ripple
            class="col relative-position"
            id="right"
            style="
              height: 110px;
              width: 110px;
              border: 2px solid var(--q-secondary);
              border-right: none;
            "
            @click="padMovePlayer('right')"
          ></div>
        </div>
        <div class="row full-width" style="width: 110px">
          <div
            v-ripple
            class="col relative-position"
            id="left"
            style="
              height: 110px;
              width: 110px;
              border: 2px solid var(--q-secondary);
              border-left: none;
            "
            @click="padMovePlayer('left')"
          ></div>
          <div
            v-ripple
            class="col relative-position"
            id="down"
            style="
              height: 110px;
              width: 110px;
              border: 2px solid var(--q-secondary);
              border-right: none;
            "
            @click="padMovePlayer('down')"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { walls, doors } from './obstacles';
import { useSessionStore } from 'stores/session';

import Player from 'components/Player.vue';

export default defineComponent({
  name: 'GamePage',

  setup() {
    const sessionStore = useSessionStore();

    return {
      sessionStore,
    };
  },

  components: {
    Player,
  },

  mounted() {
    this.rollDice();
  },

  data() {
    return {
      walls,
      doors,
      showMarkers: false,
      lastDirection: 'up',
      dice: 0,
    };
  },

  computed: {
    isNpc() {
      return (
        this.sessionStore.activePlayer.name !==
        this.sessionStore.playerSelected.name
      );
    },
  },

  methods: {
    padMovePlayer(direction: string): boolean | undefined {
      let player: any = document.querySelector(
        `#${this.sessionStore.activePlayer.name}`
      );
      if (!player || player.classList.contains('player-moving')) return;

      const top = parseInt(getComputedStyle(player).top.replace('px', ''));
      const left = parseInt(getComputedStyle(player).left.replace('px', ''));

      if (direction === 'up') {
        const nextFloor = this.sessionStore.activePlayer.playerPosition - 24;
        if (nextFloor < 0 || nextFloor > 600 || this.walls.includes(nextFloor))
          return false;

        player.classList.add('player-moving');
        player.style.top = top - 50 + 'px';

        if (this.lastDirection == 'up') {
          this.setPlayerFocus('y');
        }

        setTimeout(() => {
          this.setPlayerPosition(player, nextFloor);
        }, 300);
      } else if (direction === 'right') {
        const nextFloor = this.sessionStore.activePlayer.playerPosition + 1;
        if (nextFloor < 0 || nextFloor > 600 || this.walls.includes(nextFloor))
          return false;

        player.classList.add('player-moving');
        player.style.left = left + 50 + 'px';

        if (this.lastDirection == 'right') {
          this.setPlayerFocus('x');
        }

        setTimeout(() => {
          this.setPlayerPosition(player, nextFloor);
        }, 300);
      } else if (direction === 'down') {
        const nextFloor = this.sessionStore.activePlayer.playerPosition + 24;
        if (nextFloor < 0 || nextFloor > 600 || this.walls.includes(nextFloor))
          return false;

        player.classList.add('player-moving');
        player.style.top = top + 50 + 'px';

        if (this.lastDirection == 'down') {
          this.setPlayerFocus('y');
        }

        setTimeout(() => {
          this.setPlayerPosition(player, nextFloor);
        }, 300);
      } else if (direction === 'left') {
        const nextFloor = this.sessionStore.activePlayer.playerPosition - 1;
        if (nextFloor < 0 || nextFloor > 600 || this.walls.includes(nextFloor))
          return false;

        player.classList.add('player-moving');
        player.style.left = left - 50 + 'px';

        if (this.lastDirection == 'left') {
          this.setPlayerFocus('x');
        }

        setTimeout(() => {
          this.setPlayerPosition(player, nextFloor);
        }, 300);
      }

      this.lastDirection = direction;
      return true;
    },

    setPlayerPosition(player: any, nextFloor: number) {
      player.classList.remove('player-moving');
      this.sessionStore.activePlayer.playerPosition = nextFloor;
      this.dice--;
      if (this.dice && this.isNpc) {
        setTimeout(() => {
          this.checkNpc();
        }, 1000);
      }

      const place = this.doors.find(
        (d) => d.door == this.sessionStore.activePlayer.playerPosition
      );
      if (place) {
        this.enterPlace(place);
      } else if (!this.dice) {
        this.sessionStore.changeActivePlayer();
        this.rollDice();
      }
    },

    enterPlace(place: any) {
      this.dice = 0;
      alert(`Entrou no ${place.place}`);
    },

    rollDice() {
      this.dice = 6;
      this.setPlayerFocus();
      if (this.isNpc) {
        setTimeout(() => {
          this.checkNpc();
        }, 1000);
      }
    },

    checkNpc() {
      if (!this.isNpc || this.$route.name !== 'game' || !this.dice) return;

      const directions = ['up', 'right', 'left', 'down'];
      const direction =
        directions[Math.floor(Math.random() * directions.length)];

      const npcMove = this.padMovePlayer(direction);

      if (npcMove === false) {
        this.checkNpc();
      }
    },

    setPlayerFocus(index?: string) {
      setTimeout(() => {
        let player: any = document.querySelector(
          `#${this.sessionStore.activePlayer.name}`
        );
        if (!player) return;

        const rect = player.getBoundingClientRect();
        const width = this.$q.screen.width;
        const height = this.$q.screen.height;

        if (index === 'x') {
          window.scrollBy(rect.x - width / 2, 0);
        } else if (index === 'y') {
          window.scrollBy(0, rect.y - height / 2);
        } else {
          window.scrollBy(rect.x - width / 2, rect.y - height / 2);
        }
      });
    },
  },
});
</script>

<style scoped>
.board {
  /*
    board_old
    background-size: 1350px 1354px;
    background-position-x: -73px;
    background-position-y: -50px;

    board_1
    background-size: 1343px 1394px;
    background-position-x: -73px;
    background-position-y: -68px;
   */
  background: url(/src/assets/img/boards/board_1.jpg) no-repeat;
  background-size: 1343px 1394px;
  background-position: center;
  background-position-x: -73px;
  background-position-y: -68px;
  width: 1200px;
  height: 1250px;
  margin: 0 auto;
  outline: 2px solid #ccc;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: repeat(auto-fill, 50px);
  justify-content: center;
  position: relative;
}
.board div {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.floor {
  position: relative;
  /* background: var(--q-warning); */
  grid-column-end: span 1;
  grid-row-end: span 1;
  margin: 0;
  width: 50px;
  height: 50px;
  color: var(--q-secondary);
  font-weight: 900;
}
.floor-markers {
  border-left: 1px solid #121212;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #121212;
  border-top: 1px solid #fff;
}

.places {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0) !important;
}
.place {
  background: rgba(0, 0, 0, 0.2) !important;
  color: #fff;
}
.stairway {
  position: absolute;
  top: 400px;
  left: 450px;
  margin: 0;
  width: 250px;
  height: 350px;
}
.study {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  width: 350px;
  height: 200px;
}
.hall {
  position: absolute;
  top: 0;
  left: 450px;
  margin: 0;
  width: 300px;
  height: 350px;
}
.lounge {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  width: 350px;
  height: 300px;
}
.library {
  position: absolute;
  top: 300px;
  left: 0;
  margin: 0;
  width: 350px;
  height: 250px;
}
.dinning {
  position: absolute;
  top: 450px;
  right: 0;
  margin: 0;
  width: 400px;
  height: 350px;
}
.billiard {
  position: absolute;
  top: 600px;
  left: 0;
  margin: 0;
  width: 300px;
  height: 250px;
}
.conservatory {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0;
  width: 300px;
  height: 300px;
}
.ballroom {
  position: absolute;
  bottom: 0;
  left: 400px;
  margin: 0;
  width: 400px;
  height: 400px;
}
.kitchen {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0;
  width: 300px;
  height: 350px;
}

.control-pad {
  position: fixed;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  bottom: 5%;
  right: 5%;
  width: 200px;
  height: 200px;
  background: rgba(0, 0, 0, 0.2) !important;
  border: 3px solid var(--q-secondary);
  border-radius: 50%;
  transform: rotate(45deg);
  z-index: 1;
}
.control-pad-disabled {
  opacity: 0;
  pointer-events: none;
  touch-action: none;
}
</style>


