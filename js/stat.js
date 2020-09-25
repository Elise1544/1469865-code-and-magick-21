'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;

var BAR_WIDTH = 40;
var BAR_GAP = 50;

var GAP = 10;
var TEXT_HEIGHT = 16;
var BAR_HEIGHT = CLOUD_HEIGHT - BAR_GAP - TEXT_HEIGHT - BAR_GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var cssHSL = function () {
  return `hsl(` + 240 + `,` + (100 * Math.random()) + `%,` + (50 + 35 * Math.random()) + `%)`;
};

var renderText = function (ctx, players, times) {
  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = `#000`;
    ctx.fillText(
        players[i],
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + BAR_GAP + BAR_HEIGHT + TEXT_HEIGHT
    );

    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + BAR_GAP + TEXT_HEIGHT
    );
  }
};

var renderRect = function (ctx, players, times) {
  var maxTime = getMaxElement(times);
  for (var i = 0; i < players.length; i++) {
    if (players[i] === `Вы`) {
      ctx.fillStyle = `#f00`;
    } else {
      ctx.fillStyle = cssHSL();
    }

    ctx.fillRect(
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        BAR_GAP + BAR_HEIGHT + CLOUD_Y + GAP,
        BAR_WIDTH,
        -(BAR_HEIGHT * times[i]) / maxTime + TEXT_HEIGHT + GAP
    );

  }
};

window.renderStatistics = function (ctx, players, times) {

  renderCloud(ctx, 110, 20, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, 100, 10, `#fff`);
  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;
  ctx.fillText(`Ура вы победили!`, 120, 30);
  ctx.fillText(`Список результатов:`, 120, 50);

  renderText(ctx, players, times);
  renderRect(ctx, players, times);
};


