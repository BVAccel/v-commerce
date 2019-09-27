var gulp = require('gulp');
var shopify = require('@bva/gulp-shopify-upload');
var watch = require('gulp-watch');

require('dotenv').config();

var config = [process.env.PASSWORD, process.env.URL, process.env.THEME_ID];

var options = {
  basePath: 'dist/',
};

gulp.task('upload:deploy', function() {
  return gulp.src(['dist/**/*']).pipe(shopify(...config, options));
});

gulp.task('upload:watch', function() {
  return watch(['dist/**/*']).pipe(shopify(...config, options));
});
