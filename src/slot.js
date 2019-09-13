/**
 * Represents a Slot Machine game.
 * @constructor
 * @param {Object} params - The parameters required to create a game, such as resources, settings, etc.
 * @param {number} gameWidth - The width of the game.
 * @param {number} gameHeight - The height of the game.
 * @example
 * let game = new Slot({
 *  container: '.game-container',
 * }, 100, 100);
 */
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
    network: false,
  };
  this.waitForResult = false;
  this.forceStopPending = false;

  this.reels.onStart(function() {
    if (this.settings.network) {
      this.waitForResult = true;
    }
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

/**
 * This is the load resources method used to add resources to the game.
 * @param {Array} config - Array with resources key and source path.
 * @param {function} onComplete - Complete method which runs after loading is finished.
 */
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
/**
 * The main play method used to start or stop the reels.
 */
Slot.prototype.play = function() {
  if (!this.waitForResult) {
    if (!this.reels.rolling) {
      this.reels.start();
    } else {
      this.reels.stop();
    }
  }
  if (this.reels.rolling) {
    this.forceStopPending = true;
  }
};
/**
 * The result method is used to set a result and stop the reels.
 * @param {Array} result - The array containing the result for each reel.
 */
Slot.prototype.result = function(result) {
  this.reels.reels.forEach(function(reel, reelIndex) {
    reel.stopValues = result[reelIndex];
  });
  if (this.forceStopPending) {
    this.reels.stop();
    this.forceStopPending = false;
  }
  this.waitForResult = false;
};
/**
 * The method to attach event handlers on game.
 * @param {string} eventName - The name of the event.
 * @param {function} fn - The event callback.
 */
Slot.prototype.on = function(eventName, fn) {
  if (eventName in this.events) {
    this.events[eventName].push(fn);
  }
};
/**
 * The method to add a sprite in the game.
 * @param {string} resourceKey - The name of the resource, which must have been set on loading's configuration.
 */
Slot.prototype.sprite = function(resourceKey) {
  var sprite = new Slot.Sprite(resourceKey, this.engine);
  return sprite;
};
/**
 * Describes game actions. Can be attached to sprites.
 * @example
 * let buttonPlay = game.sprite('btn-play');
 * buttonPlay.action = Slot.ACTION.PLAY;
 */
Slot.ACTION = {
  NO_ACTION: 0,
  PLAY: 1,
};