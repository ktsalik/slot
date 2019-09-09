var game = new Slot({
  container: '#game-container',
}, 1500, 640);

game.load([
  ['symbol-1', 'assets/space adventure/symbol-1.png'],
  ['symbol-2', 'assets/space adventure/symbol-2.png'],
  ['symbol-3', 'assets/space adventure/symbol-3.png'],
  ['symbol-4', 'assets/space adventure/symbol-4.png'],
  ['symbol-5', 'assets/space adventure/symbol-5.png'],
  ['symbol-6', 'assets/space adventure/symbol-6.png'],
  ['symbol-7', 'assets/space adventure/symbol-7.png'],
  ['symbol-8', 'assets/space adventure/symbol-8.png'],
  ['symbol-9', 'assets/space adventure/symbol-9.png'],
  ['symbol-10', 'assets/space adventure/symbol-10.png'],
], function() {

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

  game.on('stop', function () {
    // change spin values
    for (var i = 0; i < reelsCount; i++) {
      for (var k = 0; k < 100; k++) {
        game.reels.get(i).spinValues.push(parseInt(Math.random() * 10) + 1);
      }
    }
  });

  window.addEventListener('keydown', function (e) {
    if (e.keyCode == 32) {
      game.play();
    }
  });
});