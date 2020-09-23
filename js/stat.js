'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;

var BAR_WIDTH = 40
var BAR_GAP = 50;

var GAP = 10;
var FONT_GAP = 15;
var TEXT_HEIGHT = 16;
var barHeight = CLOUD_HEIGHT - BAR_GAP - TEXT_HEIGHT - BAR_GAP;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var times = [3457, 5236, 5214, 2678];

var getMaxElement = function(arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};
var maxTime = getMaxElement(times);

var cssHSL = function() {
  return "hsl(" + 240 + ',' + (100 * Math.random()) + '%,' + (50 + 35 * Math.random()) + '%)';
};

var players = ['Вы', 'Кекс', 'Катя', 'Игорь'];

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#fff');
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline ='hanging';
  ctx.fillText('Ура вы победили!', 120, 30);
  ctx.fillText('Список результатов:', 120, 50);

  for (var i = 0; i < players.length; i++) {
    if (players[i] === 'Вы') {
      ctx.fillStyle = '#f00';
      } else {
        ctx.fillStyle = cssHSL();
        };

  ctx.fillRect(
    CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
    BAR_GAP + barHeight + CLOUD_Y + GAP,
    BAR_WIDTH,
    -(barHeight * times[i]) / maxTime + TEXT_HEIGHT
    )

  ctx.fillStyle = '#000';
  ctx.fillText(
    players[i],
    CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
    CLOUD_Y + BAR_GAP + barHeight + TEXT_HEIGHT
    );

  ctx.fillText(
    Math.round(times[i]),
    CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
    CLOUD_Y + BAR_GAP + TEXT_HEIGHT
      )
    };
  };
