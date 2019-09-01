var Game = function(width, height) {
  this.width = width;
  this.height = height;
  this.renderer = new PIXI.Renderer({
    width: 800,
    height: 600,
    transparent: true,
  });
  this.stage = new PIXI.Container();

  var _this = this;

  var welcomeText = new PIXI.Text('Hello World from PixiJS v' + PIXI.VERSION, {
    fill: '#000'
  });
  this.stage.addChild(welcomeText);

  (function render() {
    _this.renderer.render(_this.stage);
    requestAnimationFrame(render);
  })();
};