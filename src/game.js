Slot.Game = function(width, height) {
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

  PIXI.Ticker.shared.add(function() {
    _this.renderer.render(_this.stage);
  }, PIXI.UPDATE_PRIORITY.NORMAL);
};