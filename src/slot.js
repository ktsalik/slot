var Slot = function(params, gameWidth, gameHeight) {
  this.VERSION = '0.1';
  this.engine = new Slot.Game(gameWidth, gameHeight);
  this.engine.game = this;
  this.reels = new Slot.ReelsController(this);
  this.events = {
    start: [],
    stop: [],
  };
  this.settings = {
    speed: 0.2,
    spinTime: 450,
    spinTimeBetweenReels: 120,
    reelBounceDuration: 300,
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

  var _this = this;
  
  if ('resources' in params) {
    params.resources.forEach(function(resource) {
      if (resource.length) {
        PIXI.Loader.shared.add(resource[0], resource[1]);
      } else {
        PIXI.Loader.shared.add(resource.key, resource.value);
      }
    });
  }

  if ('init' in params) {
    PIXI.Loader.shared.load(function() {
      params.init.bind(_this)(_this);
    });
  }

  if ('settings' in params) {
    for (var key in params.settings) {
      this.settings[key] = params.settings[key];
    }
    this.reels.spinTime = this.settings.spinTime;
    this.reels.spinTimeBetweenReels = this.settings.spinTimeBetweenReels;
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

Slot.prototype.sprite = function(resourceKey) {
  var sprite = new Slot.Sprite(resourceKey, this.engine);
  return sprite;
};

Slot.ACTION = {
  NO_ACTION: 0,
  PLAY: 1,
};