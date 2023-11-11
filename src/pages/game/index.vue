<template>
  <q-page class="clue-page">
    <div
      class="options-bar fixed-top flex justify-end"
      :style="loaded && 'top: 0;'"
    >
      <div v-ripple class="options-bar-item">
        <q-icon
          name="checklist_rtl"
          size="24px"
          color="primary"
          @click="layoutStore.checklistDialog = true"
        />
      </div>
      <div
        v-ripple
        class="options-bar-item"
        @click="layoutStore.cardsDialog = true"
      >
        <q-icon name="style" size="24px" color="primary" />
      </div>
      <div v-ripple class="options-bar-item">
        <q-icon
          name="logout"
          size="24px"
          color="primary"
          @click="$router.push('/home')"
        />
      </div>
    </div>
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

        <template v-for="(player, j) in sessionStore.game.players" :key="j">
          <Player
            :playerName="player.name"
            :floor="index"
            :playerPosition="getPlayerPosition(player)"
          />
        </template>
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

      <div class="controls">
        <div v-if="isPlayer && sessionStore.game.diceValue" class="control-pad">
          <div class="row full-width">
            <div
              v-ripple
              class="col pad"
              id="up"
              style="border-left: none; margin: 4px; margin-left: 0"
              @click="padMovePlayer('up')"
            ></div>
            <div
              v-ripple
              class="col pad"
              id="right"
              style="border-right: none; margin: 4px; margin-right: 0"
              @click="padMovePlayer('right')"
            ></div>
          </div>
          <div class="row full-width" style="width: 110px">
            <div
              v-ripple
              class="col pad"
              id="left"
              style="border-left: none; margin: 4px; margin-left: 0"
              @click="padMovePlayer('left')"
            ></div>
            <div
              v-ripple
              class="col pad"
              id="down"
              style="border-right: none; margin: 4px; margin-right: 0"
              @click="padMovePlayer('down')"
            ></div>
          </div>
        </div>
      </div>

      <q-dialog
        v-model="rollDiceBtnDialog"
        transition-show="scale"
        transition-hide="scale"
        persistent
        full-width
        style="z-index: 999"
      >
        <div class="d-flex column flex-center transparent">
          <div class="text-white text-h4 clue-text-shadow">Role os Dados</div>
          <q-avatar
            @click="rollDice"
            size="200px"
            class="cursor-pointer relative-position"
            v-ripple
          >
            <q-img class="clue-text-shadow" src="img/dices.png"></q-img>
          </q-avatar>
        </div>
      </q-dialog>
    </div>
  </q-page>
  <DiceDialog />
  <CardsDialog />
  <ChecklistDialog />
  <PlaceDialog :isPlayer="isPlayer" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { matrix, walls, doors } from './obstacles';
import { useSessionStore } from 'stores/session';
import { useLayoutStore } from 'stores/layout';
import { useFirebaseStore } from 'stores/firebase';

import Player from 'components/Player.vue';
import DiceDialog from 'components/DiceDialog.vue';
import CardsDialog from 'components/CardsDialog.vue';
import PlaceDialog from 'components/PlaceDialog.vue';
import ChecklistDialog from 'components/ChecklistDialog.vue';

import { IPlayer } from 'src/models';

export default defineComponent({
  name: 'GamePage',

  setup() {
    const sessionStore = useSessionStore();
    const layoutStore = useLayoutStore();
    const firebaseStore = useFirebaseStore();

    return {
      sessionStore,
      layoutStore,
      firebaseStore,
    };
  },

  components: {
    Player,
    DiceDialog,
    CardsDialog,
    ChecklistDialog,
    PlaceDialog,
  },

  mounted() {
    this.loaded = true;
    this.setPlayerFocus();

    this.localPlayers = Array.from(this.sessionStore.game.players);

    if (this.isNpc && this.isOwner) {
      setTimeout(() => {
        this.rollDice();
      }, 1000);
    } else if (this.isPlayer) {
      setTimeout(() => {
        this.rollDiceBtnDialog = true;
      }, 1000);
    }
  },

  beforeRouteEnter(to, from, next) {
    const sessionStore = useSessionStore();

    if (!sessionStore.game.id || sessionStore.game.status !== 'started') {
      next(false);
    } else {
      next();
    }
  },

  beforeRouteLeave(to, from, next) {
    if (this.sessionStore.game.id) {
      next(from);
      this.layoutStore.exitGameDialog = true;
    } else {
      next();
    }
  },

  data() {
    return {
      walls,
      doors,
      loaded: false,
      showMarkers: false,
      lastDirection: 'up',
      rollDiceBtnDialog: false,
      nextDoor: 0,
      lastPosition: 0,
      localPlayers: [] as IPlayer[],
    };
  },

  watch: {
    'sessionStore.game': {
      handler: function (novo) {
        if (!novo.id) {
          this.$router.push('/home');
        } else {
          this.firebaseStore.updateGame(novo);

          if (!novo.diceValue) {
            this.localPlayers = Array.from(novo.players);
          }
        }
      },
      deep: true,
    },

    'sessionStore.game.rollDice': function (novo) {
      if (!novo) {
        this.setPlayerFocus();
        if (this.isNpc && this.isOwner) {
          setTimeout(() => {
            this.checkNpc();
          }, 1000);
        }
      }
    },

    'sessionStore.activePlayer': {
      handler: function (novo, antigo) {
        if (novo.playerPosition !== antigo.playerPosition) {
          if ((this.isNpc && !this.isOwner) || !this.isPlayer) {
            this.walk();
          }
        }

        if (novo.id === antigo.id) return;

        this.setPlayerFocus();
        if (this.isNpc && this.isOwner) {
          setTimeout(() => {
            this.rollDice();
          }, 1000);
        } else if (this.isPlayer) {
          setTimeout(() => {
            this.rollDiceBtnDialog = true;
          }, 1000);
        }
      },
      deep: true,
    },

    'sessionStore.game.place.place': {
      handler: function (novo) {
        if (novo) {
          this.layoutStore.placeDialog = true;
        } else {
          this.layoutStore.placeDialog = false;
        }
      },
    },
  },

  computed: {
    isOwner() {
      return this.sessionStore.game.ownerId === this.sessionStore.user?.id;
    },

    isPlayer() {
      return (
        this.sessionStore.activePlayer?.id ===
        this.sessionStore.playerSelected?.id
      );
    },

    isNpc() {
      return this.sessionStore.activePlayer?.isNpc;
    },

    rollDiceBtnDialogComputed: {
      get() {
        return (
          this.isPlayer &&
          !this.sessionStore.game.diceValue &&
          !this.sessionStore.game.rollDice
        );
      },
      set() {
        this.rollDice();
      },
    },
  },

  methods: {
    padMovePlayer(direction: string, walk?: boolean): boolean | undefined {
      console.log('padMovePlayer', direction);

      let player: any = document.querySelector(
        `#${this.sessionStore.activePlayer.name}`
      );
      if (!player || player.classList.contains('player-moving')) return;

      const top = parseInt(getComputedStyle(player).top.replace('px', ''));
      const left = parseInt(getComputedStyle(player).left.replace('px', ''));

      if (direction === 'up') {
        const nextFloor =
          this.sessionStore.activePlayer.playerPosition - (walk ? 0 : 24);
        if (!this.checkObstacle(nextFloor)) return false;

        player.classList.add('player-moving');
        player.style.top = top - 50 + 'px';

        if (this.lastDirection == 'up') {
          this.setPlayerFocus('y');
        }

        setTimeout(() => {
          if (!walk) {
            this.setPlayerPosition(player, nextFloor);
          } else {
            this.localPlayers = Array.from(this.sessionStore.game.players);
          }
        }, 300);
      } else if (direction === 'right') {
        const nextFloor =
          this.sessionStore.activePlayer.playerPosition + (walk ? 0 : 1);
        if (!this.checkObstacle(nextFloor)) return false;

        player.classList.add('player-moving');
        player.style.left = left + 50 + 'px';

        if (this.lastDirection == 'right') {
          this.setPlayerFocus('x');
        }

        setTimeout(() => {
          if (!walk) {
            this.setPlayerPosition(player, nextFloor);
          } else {
            this.localPlayers = Array.from(this.sessionStore.game.players);
          }
        }, 300);
      } else if (direction === 'down') {
        const nextFloor =
          this.sessionStore.activePlayer.playerPosition + (walk ? 0 : 24);
        if (!this.checkObstacle(nextFloor)) return false;

        player.classList.add('player-moving');
        player.style.top = top + 50 + 'px';

        if (this.lastDirection == 'down') {
          this.setPlayerFocus('y');
        }

        setTimeout(() => {
          if (!walk) {
            this.setPlayerPosition(player, nextFloor);
          } else {
            this.localPlayers = Array.from(this.sessionStore.game.players);
          }
        }, 300);
      } else if (direction === 'left') {
        const nextFloor =
          this.sessionStore.activePlayer.playerPosition - (walk ? 0 : 1);
        if (!this.checkObstacle(nextFloor)) return false;

        player.classList.add('player-moving');
        player.style.left = left - 50 + 'px';

        if (this.lastDirection == 'left') {
          this.setPlayerFocus('x');
        }

        setTimeout(() => {
          if (!walk) {
            this.setPlayerPosition(player, nextFloor);
          } else {
            this.localPlayers = Array.from(this.sessionStore.game.players);
          }
        }, 300);
      }

      this.lastDirection = direction;
      return true;
    },

    checkObstacle(nextFloor: number): boolean {
      console.log('checkObstacle', nextFloor);
      const place = this.doors.find((d) => d.door == nextFloor);

      if (
        place &&
        this.sessionStore.activePlayer.playerPosition !== place.entry
      ) {
        return false;
      } else if (
        nextFloor < 0 ||
        nextFloor > 600 ||
        this.walls.includes(nextFloor)
      ) {
        return false;
      }
      return true;
    },

    setPlayerPosition(player: any, nextFloor: number) {
      player.classList.remove('player-moving');

      console.log('nextFloor', nextFloor);

      this.sessionStore.activePlayer.playerPosition = nextFloor;

      this.sessionStore.game.diceValue--;
      if (this.sessionStore.game.diceValue && this.isNpc && this.isOwner) {
        setTimeout(() => {
          this.checkNpc();
        }, 1000);
      }

      const place = this.doors.find(
        (d) => d.door == this.sessionStore.activePlayer.playerPosition
      );
      if (place) {
        this.enterPlace(place);
      } else if (!this.sessionStore.game.diceValue) {
        this.setNextPlayer();
      }
    },

    enterPlace(place: any) {
      this.sessionStore.game.diceValue = 0;
      this.sessionStore.game.place.place = place.place;
      console.log(`Entrou no ${place.place}`);
      // this.setNextPlayer();
    },

    setNextPlayer() {
      this.sessionStore.changeActivePlayer();
    },

    rollDice() {
      this.rollDiceBtnDialog = false;
      this.sessionStore.game.diceValue = 12;
      this.sessionStore.game.rollDice = true;
    },

    walk() {
      console.log('walk');

      let movement;

      const localPlayer = this.localPlayers.find(
        (p) => p.id === this.sessionStore.activePlayer.id
      );

      if (localPlayer) {
        const oldPosition = localPlayer.playerPosition;
        console.log('oldPosition', oldPosition);

        const newPosition = this.sessionStore.activePlayer.playerPosition;

        console.log('newPosition', newPosition);

        if (oldPosition - 24 == newPosition) {
          movement = 'up';
        } else if (oldPosition + 1 == newPosition) {
          movement = 'right';
        } else if (oldPosition + 24 == newPosition) {
          movement = 'down';
        } else if (oldPosition - 1 == newPosition) {
          movement = 'left';
        }

        if (movement) {
          this.padMovePlayer(movement, true);
          console.log('walk', movement);
        }

        // const localPlayerIndex = this.localPlayers.findIndex(
        //   (p) => p.id === this.sessionStore.activePlayer.id
        // );
        // this.localPlayers[localPlayerIndex].playerPosition = newPosition;
      }
    },

    checkNpc() {
      if (
        !this.isNpc ||
        this.$route.name !== 'game' ||
        !this.sessionStore.game.diceValue
      ) {
        this.lastPosition = 0;
        return;
      }

      const playerPosition = this.sessionStore.activePlayer.playerPosition;

      let upPosition = this.sessionStore.activePlayer.playerPosition - 24;
      let rightPosition = this.sessionStore.activePlayer.playerPosition + 1;
      let downPosition = this.sessionStore.activePlayer.playerPosition + 24;
      let leftPosition = this.sessionStore.activePlayer.playerPosition - 1;

      function d(position: any, door: any) {
        return Math.sqrt(
          (door.col - position.col) * (door.col - position.col) +
            (door.row - position.row) * (door.row - position.row)
        );
      }

      const coordDoors = this.doors.map((door) => ({
        ...this.getCoord(door.door),
        ...door,
        distance: d(this.getCoord(playerPosition), this.getCoord(door.door)),
      }));

      let destination: any = null;

      coordDoors.forEach((door) => {
        if (!destination || door.distance < destination.distance) {
          destination = door;
        }
      });

      const coordDirections = [
        {
          movement: 'up',
          position: upPosition,
          ...this.getCoord(upPosition),
          distance: d(
            this.getCoord(upPosition),
            this.getCoord(destination.door)
          ),
        },
        {
          movement: 'right',
          position: rightPosition,
          ...this.getCoord(rightPosition),
          distance: d(
            this.getCoord(rightPosition),
            this.getCoord(destination.door)
          ),
        },
        {
          movement: 'down',
          position: downPosition,
          ...this.getCoord(downPosition),
          distance: d(
            this.getCoord(downPosition),
            this.getCoord(destination.door)
          ),
        },
        {
          movement: 'left',
          position: leftPosition,
          ...this.getCoord(leftPosition),
          distance: d(
            this.getCoord(leftPosition),
            this.getCoord(destination.door)
          ),
        },
      ];

      let direction: any = null;

      console.log('coordDoors', coordDoors);
      console.log('coordDirections', coordDirections);

      const isInsidePlace = coordDoors.find(
        (door) => door.door === playerPosition
      );
      if (isInsidePlace) {
        const nextStep = coordDirections.find(
          (dir) => dir.position === isInsidePlace.entry
        );
        direction = nextStep;
      } else {
        coordDirections.forEach((dir) => {
          if (
            this.checkObstacle(dir.position) &&
            dir.position !== this.lastPosition
          ) {
            if (!direction || dir.distance < direction.distance) {
              direction = dir;
            }
          }
        });
      }

      this.lastPosition = playerPosition;

      const npcMove = this.padMovePlayer(direction.movement);

      if (npcMove === false) {
        this.checkNpc();
      }
    },

    getCoord(position: number) {
      const tableMatrix = matrix();

      let coordRow, coorCol;

      tableMatrix.forEach((row) => {
        row.forEach((col) => {
          if (col == position) {
            coordRow = tableMatrix.indexOf(row);
            coorCol = row.indexOf(col);
          }
        });
      });

      return { col: coorCol, row: coordRow };
    },

    getPlayerPosition(player: IPlayer) {
      if (this.isPlayer) {
        return player.playerPosition;
      } else {
        return this.localPlayers.find((p) => p.id === player.id)
          ?.playerPosition;
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
  background: url(/img/boards/board_1.jpg) no-repeat;
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

.controls {
  position: fixed;
  bottom: 5%;
  right: 5%;
  width: 200px;
  height: 200px;
  z-index: 1;
}

.options-bar {
  top: -100%;
  transition: top 1s;
  z-index: 1;
}

.options-bar-item {
  position: relative;
  background: #fff;
  padding: 10px;
  border: 1px solid var(--q-primary);
  border-radius: 50%;
  margin-top: 5px;
  margin-right: 15px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s;
}
.options-bar-item:hover {
  opacity: 1;
}

.control-pad {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 200px;
  border: 3px solid var(--q-primary);
  border-radius: 50%;
  transform: rotate(45deg);
}
.pad {
  position: relative;
  height: 110px;
  width: 110px;
  background: rgba(255, 255, 255, 0.2) !important;
  cursor: pointer;
}
</style>


