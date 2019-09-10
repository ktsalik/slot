Slot.Sprite = function(resourceKey, engine) {
  this.instance = new PIXI.Sprite(PIXI.Loader.shared.resources[resourceKey].texture);

  var _this = this;
  function resizeAndPosition() {
    var pixiSprite = _this.instance;
    pixiSprite.scale.x = engine.renderer.view.width / engine.width;
    pixiSprite.scale.y = engine.renderer.view.height / engine.height;
  }
  resizeAndPosition();
  PIXI.Ticker.shared.add(function() {
    resizeAndPosition();
  }, PIXI.UPDATE_PRIORITY.HIGH);

  engine.stage.addChild(this.instance);
};