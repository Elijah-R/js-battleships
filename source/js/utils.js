'use strict';

(function () {

  /* Returns a random integer between two (inclusive). */
  function getRandomIntFromInterval(x, y) {
    if (x > y) {
      x += y;
      y = x - y;
      x -= y;
    }
    return Math.floor(Math.random() * (y - x + 1) + x);
  }


  /* Executes given function with defined latency. */
  let lastTimeout = null;
  function delay(callback, time) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, time);
  }

  /* Creates 2d array (equilateral) filled with zeroes */
  function create2DArray(size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr[i] = new Array(size).fill(0);
    }
    return arr;
  }

  window.utils = {
    getRandomIntFromInterval: getRandomIntFromInterval,
    create2DArray: create2DArray,
    // makeTable: makeTable,
    // toggleForm: toggleForm,
    delay: delay,
    // clearNode: clearNode
  };

})();
