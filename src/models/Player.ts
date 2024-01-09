import { IPlayer } from ".";
import { useSessionStore } from 'stores/session';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import { matrix, walls, doors } from './obstacles';

export default class Player {
  private lastDirection: string = 'up';
  private rollDiceBtnDialog: boolean = false;
  private nextDoor: number = 0;
  private lastPosition: number = 0;
  private localPlayers: IPlayer[] = [];
  private sessionStore = useSessionStore()
  private $q = useQuasar();
  private route = useRoute();

  constructor(
    private isNpc: boolean,
    private isOwner: boolean,
  ) { }

  public setPlayerPosition(player: any, nextFloor: number) {
    player.classList.remove('player-moving');

    console.log('nextFloor', nextFloor);

    this.sessionStore.activePlayer.playerPosition = nextFloor;

    this.sessionStore.game.diceValue--;
    if (this.sessionStore.game.diceValue && this.isNpc && this.isOwner) {
      setTimeout(() => {
        this.checkNpc();
      }, 1000);
    }

    const place = doors.find(
      (d) => d.door == this.sessionStore.activePlayer.playerPosition
    );
    if (place) {
      this.enterPlace(place);
    } else if (!this.sessionStore.game.diceValue) {
      this.setNextPlayer();
    }
  };

  public enterPlace(place: any) {
    this.sessionStore.game.diceValue = 0;
    this.sessionStore.game.place.place = place.place;
    console.log(`Entrou no ${place.place}`);
    // this.setNextPlayer();
  };

  public setNextPlayer() {
    this.sessionStore.changeActivePlayer();
  };

  public rollDice() {
    this.rollDiceBtnDialog = false;
    this.sessionStore.game.diceValue = 12;
    this.sessionStore.game.rollDice = true;
  };

  public setPlayerFocus(index?: string) {
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
  };

  public checkObstacle(nextFloor: number): boolean {
    console.log('checkObstacle', nextFloor);
    const place = doors.find((d) => d.door == nextFloor);

    if (
      place &&
      this.sessionStore.activePlayer.playerPosition !== place.entry
    ) {
      return false;
    } else if (
      nextFloor < 0 ||
      nextFloor > 600 ||
      walls.includes(nextFloor)
    ) {
      return false;
    }
    return true;
  };

  public walk() {
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
  };

  public checkNpc() {
    if (
      !this.isNpc ||
      this.route.name !== 'game' ||
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

    const coordDoors = doors.map((door) => ({
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
  };

  public getCoord(position: number) {
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
  };

  public padMovePlayer(direction: string, walk?: boolean): boolean | undefined {
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
  }

}
