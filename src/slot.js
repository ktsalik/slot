var Slot = function(params, gameWidth, gameHeight) {
  PIXI.utils.skipHello();
  this.VERSION = '0.1';
  this.engine = new Game(gameWidth, gameHeight);
  this.reels = new ReelsController(this);

  params = params || {};
  if (params.container) {
    var containerEl = document.querySelector(params.container);
    if (containerEl) {
      containerEl.appendChild(this.engine.renderer.view);
    } else {
      console.error("Invalid container");
    }
  } else {
    document.body.appendChild(this.engine.renderer.view);
  }
  
  function onResize() {
    var ratio = gameWidth / gameHeight;
    var view = this.engine.renderer.view;
    var width = view.parentNode.offsetWidth;
    var height = width / ratio;
    this.engine.renderer.resize(width, height);

    this.reels.reels.forEach(function(reel) {
      reel.symbols.forEach(function(symbol) {
        symbol.scale.x = width / gameWidth;
        symbol.scale.y = height / gameHeight;
      });
    });
  }
  onResize.bind(this)();
  window.addEventListener('resize', onResize.bind(this));
};

Slot.prototype.load = function(config, onComplete) {
  config.forEach(function(resource) {
    if (resource.length) {
      PIXI.Loader.shared.add(resource[0], resource[1]);
    } else {
      PIXI.Loader.shared.add(resource.key, resource.value);
    }
  });
  PIXI.Loader.shared.load(onComplete);
};