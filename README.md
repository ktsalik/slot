# slot
Web Slot Machine game library based on [PixiJS](https://www.pixijs.com).

## [Docs](https://ktsalik.github.io/slot/)

## Example
Include library
````html
<script src="../dist/slot.js"></script>
````
You game container element
````html
<div id="game-container"></div>
````
Create the game
````javascript
var resources = [
  ['symbol-1', 'assets/space adventure/symbol-1.png'],
  ['symbol-2', 'assets/space adventure/symbol-2.png'],
  ['symbol-3', 'assets/space adventure/symbol-3.png'],
];

function init(game) {
  // create a reel
  var reel = game.reels.add(3); // with 3 positions

  // position reel
  reel.x = 100;
  reel.y = 100;

  // initial values
  reel.values = [1, 1, 2, 3];

  game.on('start', function() {
    // populate reel with random spin values
    var symbolsCount = 3;
    for (var i = 0; i < 14; i++) {
      reel.spinValues.push(parseInt(Math.random() * symbolsCount) + 1);
    }
    // stop (result) values
    reel.stopValues = [3, 3, 2, 1];
  });

  // play using Spacebar
  window.addEventListener('keydown', function(e) {
    if (e.keyCode == 32) {
      game.play();
    }
  });
}

// initialize game
var game = new Slot({
  container: '#game-container',
  resources,
  init,
}, 1500, 640);
````

## More examples
### Basic Example
A simple 3x3 offline game.
* [HTML](https://github.com/ktsalik/slot/blob/master/examples/basic-example.html)
* [JS](https://github.com/ktsalik/slot/blob/master/examples/basic-example.js) 
* [Live](http://htmlpreview.github.io/?https://github.com/ktsalik/slot/blob/master/examples/basic-example.html)
### Network Example
Uses hypothetical network.
* [HTML](https://github.com/ktsalik/slot/blob/master/examples/network-example.html)
* [JS](https://github.com/ktsalik/slot/blob/master/examples/network-example.js) 
* [Live](http://htmlpreview.github.io/?https://github.com/ktsalik/slot/blob/master/examples/network-example.html)
