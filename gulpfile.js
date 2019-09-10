const { src, dest, parallel, watch, series } = require('gulp');
const concat = require('gulp-concat');

function buildJs() {
  return src([
      'node_modules/pixi.js/dist/pixi.min.js',
      'node_modules/animejs/lib/anime.min.js',
      'src/slot.js',
      'src/game.js',
      'src/reels-controller.js',
      'src/reel.js',
      'src/sprite.js',
    ], {
      sourcemaps: true
    })
    .pipe(concat('slot.js'))
    .pipe(dest('dist', {
      sourcemaps: true
    }))
}

function watchJs() {
  return watch(['src/*.js'], parallel(buildJs));
}

exports.buildJs = buildJs;
exports.watchJs = watchJs;
exports.watch = parallel(watchJs);