Slot.Sprite = function(resourceKey, engine) {
  this.instance = new PIXI.Sprite(PIXI.Loader.shared.resources[resourceKey].texture);
  this.x = 0;
  this.y = 0;
  
  Object.defineProperties(this, {
    action: {
      set: function(value) {
        this.instance.interactive = false;
        this.instance.off('pointerdown');
        switch (value) {
          case Slot.ACTION.PLAY:
            this.instance.interactive = true;
            this.instance.on('pointerdown', function() {
              engine.game.play();
            });
            break;
        };
      },
    },
    visible: {
      set: function(value) {
        this.instance.visible = value;
      },
      get: function() {
        return this.instance.visible;
      },
    },
  });

  var _this = this;
  function resizeAndPosition() {
    var pixiSprite = _this.instance;
    pixiSprite.scale.x = engine.renderer.view.width / engine.width;
    pixiSprite.scale.y = engine.renderer.view.height / engine.height;
    pixiSprite.x = (_this.x * engine.renderer.view.width) / engine.width;
    pixiSprite.y = (_this.y * engine.renderer.view.height) / engine.height;
  }
  resizeAndPosition();
  PIXI.Ticker.shared.add(function() {
    resizeAndPosition();
  }, PIXI.UPDATE_PRIORITY.HIGH);

  engine.stage.addChild(this.instance);
};