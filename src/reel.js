/**
 * Represents a reel in the game.
 * @constructor
 * @param {number} positions - Number of reel positions.
 */
Slot.Reel = function(positions) {
  this.positions = positions;
  this.values = [];
  this.spinValues = [];
  this.stopValues = [];
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

Slot.Reel.prototype.render = function(speed, bounceDuration, reelIndex) {
  var _this = this;

  if (this.rolling) {
    this.offset += this.symbols[0].height * speed;
    
    if (this.offset >= this.symbols[0].height) {
      this.offset = 0;
      if (!isNaN(parseInt(this.stopping))) {
        if (!this.stopValues.length) {
          console.error('No stop values have been set for reel: ' + reelIndex);
        }
        this.values.unshift(this.stopValues.pop());
        this.stopping++;
      } else {
        this.values.unshift(this.spinValues.pop());
      }
      this.values.splice(-1, 1);
    }

    if (this.stopping == this.positions + 1) {
      this.rolling = false;
      this.stopping++;
      var o = {
        offset: _this.symbols[0].height * speed,
      };
      this.offset = o.offset;
      anime({
        targets: o,
        offset: 0,
        round: 1,
        duration: bounceDuration,
        easing: 'easeOutQuint',
        update: function() {
          _this.offset = o.offset;
        },
        complete: function() {
          _this.stopping = false;
        },
      });
    }
  }
};
/**
 * Starts reel spinning.
 */
Slot.Reel.prototype.roll = function() {
  if (!this.rolling && this.stopping === false) {
    this.rolling = true;
  }
};
/**
 * Stops reel from spinning.
 */
Slot.Reel.prototype.stop = function() {
  if (this.rolling && this.stopping === false) {
    this.stopping = 0;
  }
};
