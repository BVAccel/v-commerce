
var gulp       = require('gulp');
var webpack    = require('webpack-stream');

var webpackDev = require('../webpack.dev.js');
var webpackProd = require('../webpack.prod.js');

var scriptsPath = 'src/scripts/bvaccel.js';
var scriptsDest = 'dist/assets';

gulp.task('scripts:dev', function () {
  return gulp.src(scriptsPath)
    .pipe(webpack(webpackDev))
    .pipe(gulp.dest(scriptsDest));
});

gulp.task('scripts:prod', function () {
  return gulp.src(scriptsPath)
    .pipe(webpack(webpackProd))
    .pipe(gulp.dest(scriptsDest));
});

gulp.task('scripts:watch', function (done) {
  gulp.watch([
    'src/scripts/**/*',
    'src/styles/boilerplate.scss',
    'src/styles/variables.scss',
    'src/styles/tools/*.scss',
  ], gulp.series('scripts:dev'));
  done();
});
