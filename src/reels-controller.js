var ReelsController = function(engine) {
  this.reels = [];
  this.engine = engine;

  var _this = this;
  (function render() {
    _this.reels.forEach(function(reel) {
      for (var i = 0; i < reel.symbols.length; i++) {
        var symbol = reel.symbols[i];
        symbol.y = (symbol.height * (i - 1)) + ((0 + reel.offset) * engine.renderer.view.height) / engine.height;
        if (reel.values[i]) {
          symbol.texture = PIXI.Loader.shared.resources['symbol-' + reel.values[i]].texture;
        } else {
          symbol.texture = PIXI.Texture.EMPTY;
        }
      }
      
      var m = reel.mask;
      m.x = reel.container.x;
      m.y = reel.container.y;
      m.clear();
      m.beginFill(0x000000);
      m.drawRect(0, 0, reel.symbols[0].width, reel.symbols[0].height * reel.positions);
      m.endFill();

      reel.render();
    });
    requestAnimationFrame(render);
  })();
};

ReelsController.prototype.add = function(positions, symbolCount, symbolWidth, symbolHeight) {
  var reel = new Reel(positions, symbolCount, symbolWidth, symbolHeight);
  this.engine.stage.addChild(reel.container);
  this.engine.stage.addChild(reel.mask);
  this.reels.push(reel);
  return reel;
};

ReelsController.prototype.get = function(index) {
  return this.reels[index];
};