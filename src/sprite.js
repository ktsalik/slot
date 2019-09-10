Slot.Sprite = function(resourceKey, engine) {
  this.instance = new PIXI.Sprite(PIXI.Loader.shared.resources[resourceKey].texture);

  var _this = this;
  PIXI.Ticker.shared.add(function() {
    _this.instance.scale.x = engine.renderer.view.width / engine.width;
  }, PIXI.UPDATE_PRIORITY.HIGH);

  engine.stage.addChild(this.instance);
};