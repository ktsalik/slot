var Slot = function(params, gameWidth, gameHeight) {
  this.VERSION = '0.1';
  this.engine = new Game(gameWidth, gameHeight);
  this.reels = new ReelsController(this);
  this.events = {
    start: [],
    stop: [],
  };

  this.reels.onStart(function() {
    this.events.start.forEach(function(fn) {
      fn();
    });
  }.bind(this));

  this.reels.onStop(function() {
    this.events.stop.forEach(function(fn) {
      fn();
    });
  }.bind(this));

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
    if (height > view.parentNode.offsetHeight) {
      height = view.parentNode.offsetHeight;
      width = ratio * height;
    }
    this.engine.renderer.resize(width, height);
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

Slot.prototype.play = function() {
  if (!this.reels.rolling) {
    this.reels.start();
  } else {
    this.reels.stop();
  }
};

Slot.prototype.on = function(eventName, fn) {
  switch (eventName) {
    case 'play':
      eventName = 'start';
      break;
    case 'result':
      eventName = 'stop';
      break;
  }
  if (eventName in this.events) {
    this.events[eventName].push(fn);
  }
};