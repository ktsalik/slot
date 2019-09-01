var Slot = function(params) {
  PIXI.utils.skipHello();
  this.VERSION = '0.1';
  this.engine = new Game();

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