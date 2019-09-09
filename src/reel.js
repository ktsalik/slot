var Reel = function(positions) {
  this.positions = positions;
  this.values = [];
  this.spinValues = [];
  this.currentSpinValues = [];
  this.symbols = [];
  this.container = new PIXI.Container();
  this.mask = new PIXI.Graphics();
  this.offset = 0;
  this.rolling = false;
  this.stopping = false;

  this.container.mask = this.mask;

  for (var i = 0; i < positions + 1; i++) {
    var symbol = new PIXI.Sprite(PIXI.Texture.EMPTY);
    this.container.addChild(symbol);
    this.symbols.push(symbol);
  }
};

Reel.prototype.render = function() {
  var _this = this;

  if (this.rolling) {
    this.offset += this.symbols[0].height * 0.33;

    if (this.offset > this.symbols[0].height) {
      this.offset = 0;
      this.values.unshift(this.currentSpinValues.pop());
      this.values.splice(-1, 1);
      if (!isNaN(parseInt(this.stopping))) {
        this.stopping++;
      }
    }

    if (this.stopping == this.positions) {
      this.rolling = false;
      this.stopping++;
      var o = {
        _offset: _this.symbols[0].height * 0.33,
      };
      this.offset = o._offset;
      anime({
        targets: o,
        _offset: 0,
        round: 1,
        duration: 250,
        easing: 'easeOutQuint',
        update: function() {
          _this.offset = o._offset;
        },
        complete: function() {
          // setTimeout(function() {
            _this.stopping = false;
          // }, 100);
        },
      });
    }
  }
};

Reel.prototype.roll = function() {
  if (!this.rolling && this.stopping === false) {
    this.rolling = true;
    this.currentSpinValues = this.spinValues.slice(0);
  }
};

Reel.prototype.stop = function() {
  if (this.rolling && this.stopping === false) {
    this.stopping = 0;
  }
};
