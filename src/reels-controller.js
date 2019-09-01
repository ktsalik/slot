var ReelsController = function(game) {
  this.reels = [];
  this.engine = game.engine;
  this.game = game;

  var _this = this;
  PIXI.Ticker.shared.add(function() {
    _this.reels.forEach(function(reel) {
      reel.render();

      for (var i = 0; i < reel.symbols.length; i++) {
        var symbol = reel.symbols[i];
        symbol.y = (symbol.height * (i - 1)) + ((0 + reel.offset) * _this.engine.renderer.view.height) / _this.engine.height;
        if (reel.values[i]) {
          symbol.texture = PIXI.Loader.shared.resources['symbol-' + reel.values[i]].texture;
        } else {
          symbol.texture = PIXI.Texture.EMPTY;
        }
      }

      reel.symbols.forEach(function(symbol) {
        symbol.scale.x = game.engine.renderer.view.width / game.engine.width;
        symbol.scale.y = game.engine.renderer.view.height / game.engine.height;
      });
      
      var m = reel.mask;
      m.x = reel.container.x;
      m.y = reel.container.y;
      m.clear();
      m.beginFill(0x000000);
      m.drawRect(0, 0, reel.symbols[0].width, reel.symbols[0].height * reel.positions);
      m.endFill();
    });
  }, PIXI.UPDATE_PRIORITY.LOW);
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