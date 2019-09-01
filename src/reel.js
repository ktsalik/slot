var Reel = function(positions) {
  this.positions = positions;
  this.values = [];
  this.symbols = [];
  this.offset = 0;
  this.container = new PIXI.Container();
  this.mask = new PIXI.Graphics();
  
  this.container.mask = this.mask;

  for (var i = 0; i < positions + 1; i++) {
    var symbol = new PIXI.Sprite(PIXI.Texture.EMPTY);
    this.container.addChild(symbol);
    this.symbols.push(symbol);
  }
};

Reel.prototype.render = function() {
  
};
