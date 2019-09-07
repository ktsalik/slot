var ReelsController = function(game) {
  this.reels = [];
  this.engine = game.engine;
  this.game = game;
  this.x = 0;
  this.y = 0;
  this.events = {
    onStart: [],
    onStop: [],
  };
  this.rolling = false;

  var _this = this;
  PIXI.Ticker.shared.add(function() {
    var active = false;
    _this.reels.forEach(function(reel) {
      reel.container.x = (reel.x * game.engine.renderer.view.width) / game.engine.width;
      reel.container.y = (reel.y * game.engine.renderer.view.height) / game.engine.height;

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

      active = reel.rolling == true || !isNaN(parseInt(reel.stopping));
    });

    var previousState = _this.rolling;
    if (!_this.rolling && active) {
      _this.rolling = true;
      _this.events.onStart.forEach(function(fn) {
        fn(previousState);
      }); 
    } else if (_this.rolling && !active) {
      _this.rolling = false;
      _this.events.onStop.forEach(function (fn) {
        fn(previousState);
      });
    }
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

ReelsController.prototype.start = function() {
  this.reels.forEach(function(reel, i) {
    reel.roll();
    setTimeout(function() {
      reel.stop();
    }, 555 + (i * 100));
  });
};

ReelsController.prototype.stop = function() {
  this.reels.forEach(function(reel) {
    reel.stop();
  });
};

ReelsController.prototype.onStart = function(fn) {
  this.events.onStart.push(fn);
};

ReelsController.prototype.onStop = function (fn) {
  this.events.onStop.push(fn);
};