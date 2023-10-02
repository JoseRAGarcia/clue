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

        <div v-if="playerPosition === index" class="player">
          <div
            class="shadow-10"
            style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 1px solid #ccc;
            "
          ></div>
        </div>
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

      <div class="control-pad">
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

export default defineComponent({
  name: 'GamePage',

  mounted() {
    this.setPlayerFocus();
  },

  data() {
    return {
      walls,
      doors,
      showMarkers: false,
      playerPosition: 120,
      lastDirection: 'up',
    };
  },

  methods: {
    padMovePlayer(direction: string) {
      let player: any = document.querySelector('.player');
      if (!player) return;

      const top = parseInt(getComputedStyle(player).top.replace('px', ''));
      const left = parseInt(getComputedStyle(player).left.replace('px', ''));

      if (direction === 'up') {
        const nextFloor = this.playerPosition - 24;
        if (nextFloor < 0 || nextFloor > 600 || this.walls.includes(nextFloor))
          return;

        player.classList.add('player-moving');
        player.style.top = top - 50 + 'px';

        if (this.lastDirection == 'up') {
          this.setPlayerFocus('y');
        }

        setTimeout(() => {
          player.classList.remove('player-moving');
          this.playerPosition = nextFloor;

          const place = this.doors.find((d) => d.door == this.playerPosition);
          if (place) {
            alert(`Entrou no ${place.place}`);
          }
        }, 300);
      } else if (direction === 'right') {
        const nextFloor = this.playerPosition + 1;
        if (nextFloor < 0 || nextFloor > 600 || this.walls.includes(nextFloor))
          return;

        player.classList.add('player-moving');
        player.style.left = left + 50 + 'px';

        if (this.lastDirection == 'right') {
          this.setPlayerFocus('x');
        }

        setTimeout(() => {
          player.classList.remove('player-moving');
          this.playerPosition = nextFloor;

          const place = this.doors.find((d) => d.door == this.playerPosition);
          if (place) {
            alert(`Entrou no ${place.place}`);
          }
        }, 300);
      } else if (direction === 'down') {
        const nextFloor = this.playerPosition + 24;
        if (nextFloor < 0 || nextFloor > 600 || this.walls.includes(nextFloor))
          return;

        player.classList.add('player-moving');
        player.style.top = top + 50 + 'px';

        if (this.lastDirection == 'down') {
          this.setPlayerFocus('y');
        }

        setTimeout(() => {
          player.classList.remove('player-moving');
          this.playerPosition = nextFloor;

          const place = this.doors.find((d) => d.door == this.playerPosition);
          if (place) {
            alert(`Entrou no ${place.place}`);
          }
        }, 300);
      } else if (direction === 'left') {
        const nextFloor = this.playerPosition - 1;
        if (nextFloor < 0 || nextFloor > 600 || this.walls.includes(nextFloor))
          return;

        player.classList.add('player-moving');
        player.style.left = left - 50 + 'px';

        if (this.lastDirection == 'left') {
          this.setPlayerFocus('x');
        }

        setTimeout(() => {
          player.classList.remove('player-moving');
          this.playerPosition = nextFloor;

          const place = this.doors.find((d) => d.door == this.playerPosition);
          if (place) {
            alert(`Entrou no ${place.place}`);
          }
        }, 300);
      }

      this.lastDirection = direction;
    },

    setPlayerFocus(index?: string) {
      setTimeout(() => {
        let player: any = document.querySelector('.player');
        if (!player) return;

        const rect = player.getBoundingClientRect();
        const width = this.$q.screen.width;
        const height = this.$q.screen.height;
        console.log('rect', rect);
        console.log(rect.x - width / 2, rect.y - height / 2);

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

.player {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #121212;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s;
  z-index: 1;
}
.player-moving {
  transform: scale(105%) translate(-50%, -50%);
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
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
</style>


