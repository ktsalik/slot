var resourcesUrl = 'assets/space adventure/';
var gameWidth = 1500;
var gameHeight = 640;

var game = new Slot({
  container: '#game-container',
  resources: [
    ['symbol-1', resourcesUrl + 'symbol-1.png'],
    ['symbol-2', resourcesUrl + 'symbol-2.png'],
    ['symbol-3', resourcesUrl + 'symbol-3.png'],
    ['symbol-4', resourcesUrl + 'symbol-4.png'],
    ['symbol-5', resourcesUrl + 'symbol-5.png'],
    ['symbol-6', resourcesUrl + 'symbol-6.png'],
    ['symbol-7', resourcesUrl + 'symbol-7.png'],
    ['symbol-8', resourcesUrl + 'symbol-8.png'],
    ['symbol-9', resourcesUrl + 'symbol-9.png'],
    ['symbol-10', resourcesUrl + 'symbol-10.png'],
    ['btn-spin', resourcesUrl + 'button-spin.png'],
  ],
  init: function(game) {
    // 3x3
    var reelsCount = 3;
    var reelsPositions = 3;
    for (var i = 0; i < reelsCount; i++) {
      // create reel
      var reel = game.reels.add(reelsPositions);

      // position reel
      reel.x = i * 140;
      reel.y = 100;

      // populate reel with values
      for (var k = 0; k < reelsPositions + 1; k++) {
        reel.values.push(parseInt(Math.random() * 10) + 1);
      }
      for (var k = 0; k < 100; k++) {
        reel.spinValues.push(parseInt(Math.random() * 10) + 1);
      }
    }

    game.on('result', function() {
      // change spin values
      for (var i = 0; i < reelsCount; i++) {
        for (var k = 0; k < 100; k++) {
          game.reels.get(i).spinValues.push(parseInt(Math.random() * 10) + 1);
        }
      }
    });

    var btnPlay = game.sprite('btn-spin');

    window.addEventListener('keydown', function(e) {
      if (e.keyCode == 32) {
        game.play();
      }
    });
  },
}, gameWidth, gameHeight);