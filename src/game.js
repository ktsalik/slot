var Game = function(width, height) {
  this.width = width;
  this.height = height;
  PIXI.utils.skipHello();
  this.renderer = new PIXI.autoDetectRenderer({
    width: 800,
    height: 600,
    transparent: false,
  });
  this.stage = new PIXI.Container();

  var _this = this;

  var welcomeText = new PIXI.Text('Hello World from PixiJS v' + PIXI.VERSION + '\nUse Space to play', {
    fill: '#FFF'
  });
  this.stage.addChild(welcomeText);

  PIXI.Ticker.shared.add(function () {
    _this.renderer.render(_this.stage);
  }, PIXI.UPDATE_PRIORITY.NORMAL);
};