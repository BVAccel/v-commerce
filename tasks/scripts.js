var gulp = require('gulp');
var rename = require('gulp-rename');
var cache = require('gulp-cached');
var webpack = require('webpack-stream');

var webpackDev = require('../webpack.dev.js');
var webpackProd = require('../webpack.prod.js');

var scriptsPaths = ['src/scripts/templates/**/*.js', 'src/scripts/layout/*.js'];
var scriptsDest = 'dist/assets';

gulp.task('scripts:dev', function() {
  return gulp
    .src(scriptsPaths)
    .pipe(webpack(webpackDev))
    .pipe(cache('scripts'))
    .pipe(
      rename(function(file) {
        if (file.extname.indexOf('?') !== -1) file.extname = file.extname.split('?')[0];
        return file;
      }),
    )
    .pipe(gulp.dest(scriptsDest));
});

gulp.task('scripts:prod', function() {
  return gulp
    .src(scriptsPaths)
    .pipe(webpack(webpackProd))
    .pipe(
      rename(function(file) {
        if (file.extname.indexOf('?') !== -1) file.extname = file.extname.split('?')[0];
        return file;
      }),
    )
    .pipe(gulp.dest(scriptsDest));
});

gulp.task('scripts:watch', function(done) {
  gulp.watch(['src/scripts/**/*', 'src/styles/boilerplate.scss', 'src/styles/variables.scss', 'src/styles/tools/*.scss'], gulp.series('scripts:dev'));
  done();
});
