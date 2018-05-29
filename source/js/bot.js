'use strict';

(function () {
  const fieldMapBotContainer = document.querySelector('.field--map-bot');
  const fieldBotNode = document.querySelector('.field--bot');

  battleship.bot = {
    field: window.utils.create2DArray(battleship.game.fieldSideSize),
    hitCounter: 0,
    map: window.utils.create2DArray(battleship.game.fieldSideSize),
    createMap: function () {
      let fieldMap = fieldMapBotContainer.getElementsByTagName('table')[0];
      if (fieldMap) {
        fieldMap.remove();
      }
      fieldMapBotContainer.appendChild(battleship.field.makeTable(battleship.bot.map));
    },

    shot: function () {
      let xCoordinate = window.utils.getRandomIntFromInterval(0, battleship.game.fieldSideSize - 1);
      let yCoordinate = window.utils.getRandomIntFromInterval(0, battleship.game.fieldSideSize - 1);

      if (battleship.bot.hitCounter !== battleship.game.winCondition) { // todo remove winCondition check
        while (battleship.bot.map[yCoordinate][xCoordinate] !== battleship.field.cellEmpty) {
          xCoordinate = window.utils.getRandomIntFromInterval(0, battleship.game.fieldSideSize - 1);
          yCoordinate = window.utils.getRandomIntFromInterval(0, battleship.game.fieldSideSize - 1);
        }


      }

      console.log('bot shot:  x: ' + xCoordinate + '  y: ' + yCoordinate);

      if (battleship.player.field[yCoordinate][xCoordinate] === battleship.field.cellWithShip) {
        battleship.bot.hitCounter += 1;
        console.log('bot.hitCounter:  ' + battleship.bot.hitCounter);
        battleship.bot.map[yCoordinate][xCoordinate] = battleship.field.cellHit;
        battleship.bot.createMap();
        battleship.player.field[yCoordinate][xCoordinate] = battleship.field.cellHit;
        battleship.player.createField();
        if (battleship.bot.hitCounter === battleship.game.winCondition) {
          console.log('Bot win');
        } else {
          battleship.bot.shot();
        }

        // battleship.bot.shotAround(xCoordinate, yCoordinate);

      } else {
        battleship.bot.map[yCoordinate][xCoordinate] = battleship.field.cellMiss;
        battleship.bot.createMap();
        battleship.player.field[yCoordinate][xCoordinate] = battleship.field.cellMiss;
        battleship.player.createField();
      }

    },

    shotAround: function (x, y) {
      let aroundCells = [];



    }

  };

  battleship.bot.createMap();

  battleship.field.placeShip(4, battleship.bot.field);
  battleship.field.placeShip(3, battleship.bot.field);
  battleship.field.placeShip(3, battleship.bot.field);
  battleship.field.placeShip(2, battleship.bot.field);
  battleship.field.placeShip(2, battleship.bot.field);
  battleship.field.placeShip(2, battleship.bot.field);
  battleship.field.placeShip(1, battleship.bot.field);
  battleship.field.placeShip(1, battleship.bot.field);
  battleship.field.placeShip(1, battleship.bot.field);
  battleship.field.placeShip(1, battleship.bot.field);

  fieldBotNode.appendChild(battleship.field.makeTable(battleship.bot.field));


})();
