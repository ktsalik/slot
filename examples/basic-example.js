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
  var reel = game.reels.add(3);
  reel.x = 50;
  reel.y = 50;
  reel.values = [1, 1, 2, 3];
  for (var i = 0; i < 100; i++) {
    reel.spinValues.push(parseInt(Math.random() * 10) + 1);
  }
});