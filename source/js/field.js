'use strict';

(function () {
  // const cellEmpty = 0;

  battleship.field = {
    cellEmpty: 0,
    cellWithShip: 1,
    cellNearbyShip: 2,
    cellHit: 3,
    cellMiss: 4,

    placeShip: function (length, field) {
      // placeShip: (length, field) =>  {
      console.log(this);

      let isVertical = Math.random() > 0.5;
      let xStartCoord;
      let yStartCoord;

      if (isVertical) {
        do {
          xStartCoord = window.utils.getRandomIntFromInterval(0, battleship.game.fieldSideSize - 1);
          yStartCoord = window.utils.getRandomIntFromInterval(0, battleship.game.fieldSideSize - length);
        } while (this.detectCollisions(xStartCoord, yStartCoord, isVertical, length, field));
      } else {
        do {
          xStartCoord = window.utils.getRandomIntFromInterval(0, battleship.game.fieldSideSize - length);
          yStartCoord = window.utils.getRandomIntFromInterval(0, battleship.game.fieldSideSize - 1);
        } while (this.detectCollisions(xStartCoord, yStartCoord, isVertical, length, field));
      }

      if (isVertical) {
        if (yStartCoord) {
          field[yStartCoord - 1][xStartCoord] = battleship.field.cellNearbyShip;
          if (!(xStartCoord === battleship.game.fieldSideSize - 1)) {
            field[yStartCoord - 1][xStartCoord + 1] = battleship.field.cellNearbyShip;
          }
          if (xStartCoord) {
            field[yStartCoord - 1][xStartCoord - 1] = battleship.field.cellNearbyShip;
          }
        }
        if (yStartCoord + length < battleship.game.fieldSideSize) {
          field[yStartCoord + length][xStartCoord] = battleship.field.cellNearbyShip;
          if (!(xStartCoord === battleship.game.fieldSideSize - 1)) {
            field[yStartCoord + length][xStartCoord + 1] = battleship.field.cellNearbyShip;
          }
          if (xStartCoord) {
            field[yStartCoord + length][xStartCoord - 1] = battleship.field.cellNearbyShip;
          }
        }
        for (let i = 0; i < length; i++) {
          field[yStartCoord + i][xStartCoord] = battleship.field.cellWithShip;
          if (xStartCoord) {
            field[yStartCoord + i][xStartCoord - 1] = battleship.field.cellNearbyShip;
          }
          if (!(xStartCoord === battleship.game.fieldSideSize - 1)) {
            field[yStartCoord + i][xStartCoord + 1] = battleship.field.cellNearbyShip;
          }
        }
      } else {
        if (xStartCoord) {
          field[yStartCoord][xStartCoord - 1] = battleship.field.cellNearbyShip;
          if (!(yStartCoord === battleship.game.fieldSideSize - 1)) {
            field[yStartCoord + 1][xStartCoord - 1] = battleship.field.cellNearbyShip;
          }
          if (yStartCoord) {
            field[yStartCoord - 1][xStartCoord - 1] = battleship.field.cellNearbyShip;
          }
        }
        if (xStartCoord + length < battleship.game.fieldSideSize) {
          field[yStartCoord][xStartCoord + length] = battleship.field.cellNearbyShip;
          if (!(yStartCoord === battleship.game.fieldSideSize - 1)) {
            field[yStartCoord + 1][xStartCoord + length] = battleship.field.cellNearbyShip;
          }
          if (yStartCoord) {
            field[yStartCoord - 1][xStartCoord + length] = battleship.field.cellNearbyShip;
          }
        }
        for (let i = 0; i < length; i++) {
          field[yStartCoord][xStartCoord + i] = battleship.field.cellWithShip;
          if (yStartCoord) {
            field[yStartCoord - 1][xStartCoord + i] = battleship.field.cellNearbyShip;
          }
          if (!(yStartCoord === battleship.game.fieldSideSize - 1)) {
            field[yStartCoord + 1][xStartCoord + i] = battleship.field.cellNearbyShip;
          }
        }
      }
    },

    detectCollisions: function (xStart, yStart, isVertical, length, field) {
      let isCollision = false;
      if (isVertical) {
        for (let i = 0; i < length; i++) {
          if (field[yStart + i][xStart] === battleship.field.cellNearbyShip || field[yStart + i][xStart] === battleship.field.cellWithShip) {
            isCollision = true;
          }
        }
      } else {
        for (let i = 0; i < length; i++) {
          if (field[yStart][xStart + i] === battleship.field.cellNearbyShip || field[yStart][xStart + i] === battleship.field.cellWithShip) {
            isCollision = true;
          }
        }
      }
      return isCollision;
    },

    makeTable: function (array) {
      const cellClass = 'field__cell';
      const cellWithShipClass = 'field__cell--ship';
      const cellNearbyShipClass = 'field__cell--nearby-ship'; // todo remove after
      const cellHitClass = 'field__cell--hit';
      const cellMissClass = 'field__cell--miss';
      let table = document.createElement('table');
      for (let i = 0; i < array.length; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < array[i].length; j++) {
          let cell = document.createElement('td');
          cell.textContent = array[i][j];

          cell.classList.add(cellClass);
          if (array[i][j] === battleship.field.cellWithShip) {
            cell.classList.add(cellWithShipClass);
          }
          if (array[i][j] === battleship.field.cellNearbyShip) {
            cell.classList.add(cellNearbyShipClass);
          }
          if (array[i][j] === battleship.field.cellHit) {
            cell.classList.add(cellHitClass);
          }
          if (array[i][j] === battleship.field.cellMiss) {
            cell.classList.add(cellMissClass);
          }

          row.appendChild(cell);
        }
        table.appendChild(row);
      }
      return table;
    }


  };

})();
