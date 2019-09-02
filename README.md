# slot
Web Slot Machine client on HTML5 WebGL using [PixiJS](https://www.pixijs.com).

````html
<div id="game-container"></div>
````

````html
<script src="../dist/slot.js"></script>
````

````javascript
// initialize game
var game = new Slot({
  container: '#game-container',
}, 1500, 640);

// load resources
game.load([
  ['symbol-1', 'assets/space adventure/symbol-1.png'],
  ['symbol-2', 'assets/space adventure/symbol-2.png'],
  ['symbol-3', 'assets/space adventure/symbol-3.png'],
], function() {
  // create a reel
  var reel = game.reels.add(3);
  
  // position reel
  reel.x = 100;
  reel.y = 100;
  
  // populate reel with current values and spin values
  reel.values = [1, 1, 2, 3];
  for (var i = 0; i < 3; i++) {
    reel.spinValues.push(parseInt(Math.random() * 10) + 1);
  }
  
  // play using Spacebar
  window.addEventListener('keydown', function (e) {
    if (e.keyCode == 32) {
      game.play();
    }
  });
});
````
