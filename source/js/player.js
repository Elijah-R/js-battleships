'use strict';

(function () {

  const fieldPlayerNode = document.querySelector('.field--player');
  const fieldMapPlayerContainer = document.querySelector('.field--map-player');

  battleship.player = {
    field: window.utils.create2DArray(battleship.game.fieldSideSize),
    hitCounter: 0,
    map: window.utils.create2DArray(battleship.game.fieldSideSize),

    createMap: function () {
      let fieldMap = fieldMapPlayerContainer.getElementsByTagName('table')[0];
      if (fieldMap) {
        fieldMap.removeEventListener('click', battleship.player.playerMapClickHandler);
        fieldMap.remove();
      }

      fieldMapPlayerContainer.appendChild(battleship.field.makeTable(battleship.player.map));
      fieldMap = fieldMapPlayerContainer.getElementsByTagName('table')[0];
      fieldMap.addEventListener('click', battleship.player.playerMapClickHandler);
    },

    playerMapClickHandler: function (evt) {
      let xCoordinate = evt.target.cellIndex;
      let yCoordinate = evt.target.parentNode.rowIndex;
      console.log('player shot:  x: ' + xCoordinate + '  y: ' + yCoordinate);
      if (typeof xCoordinate !== 'undefined' && typeof yCoordinate !== 'undefined') {

        if (battleship.bot.field[yCoordinate][xCoordinate] === battleship.field.cellWithShip && battleship.player.map[yCoordinate][xCoordinate] !== battleship.field.cellHit && battleship.player.map[yCoordinate][xCoordinate] !== battleship.field.cellMiss) {
          battleship.player.hitCounter += 1;
          console.log('player.hitCounter:  ' + battleship.player.hitCounter);

          battleship.player.map[yCoordinate][xCoordinate] = battleship.field.cellHit;
          battleship.player.createMap();
          if (battleship.player.hitCounter === battleship.game.winCondition) {
            console.log('You win');
          }
        }
        if (battleship.bot.field[yCoordinate][xCoordinate] !== battleship.field.cellWithShip && battleship.player.map[yCoordinate][xCoordinate] !== battleship.field.cellHit && battleship.player.map[yCoordinate][xCoordinate] !== battleship.field.cellMiss) {
          battleship.player.map[yCoordinate][xCoordinate] = battleship.field.cellMiss;
          battleship.player.createMap();

          battleship.bot.shot();
        }

      }
    },

    createField: function () {
      fieldPlayerNode.innerHTML = '';
      fieldPlayerNode.appendChild(battleship.field.makeTable(battleship.player.field));
    }

  };

  battleship.player.createMap();

  battleship.field.placeShip(4, battleship.player.field);
  battleship.field.placeShip(3, battleship.player.field);
  battleship.field.placeShip(3, battleship.player.field);
  battleship.field.placeShip(2, battleship.player.field);
  battleship.field.placeShip(2, battleship.player.field);
  battleship.field.placeShip(2, battleship.player.field);
  battleship.field.placeShip(1, battleship.player.field);
  battleship.field.placeShip(1, battleship.player.field);
  battleship.field.placeShip(1, battleship.player.field);
  battleship.field.placeShip(1, battleship.player.field);
  battleship.player.createField();

  // fieldPlayerNode.appendChild(battleship.field.makeTable(battleship.player.field));


})();
