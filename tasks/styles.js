
var gulp         = require('gulp');
var rename       = require('gulp-rename');
var uglifyCSS    = require('gulp-uglifycss');
var sourcemaps   = require('gulp-sourcemaps');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var stylesPath = 'src/styles/theme.scss';
var stylesDest = 'dist/assets';

var sassSettings = { 
  includePaths: ['node_modules'] 
};

gulp.task('styles:dev', function () {
  return gulp.src(stylesPath)
    .pipe(sourcemaps.init())
    .pipe(sass(sassSettings).on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write())
    .pipe(rename('bvaccel.css.liquid'))
    .pipe(gulp.dest(stylesDest));
});

gulp.task('styles:prod', function () {
  return gulp.src(stylesPath)
    .pipe(sass(sassSettings).on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(uglifyCSS())
    .pipe(rename('bvaccel.css.liquid'))
    .pipe(gulp.dest(stylesDest));
});

gulp.task('styles:watch', function (done) {
  gulp.watch('src/styles/**/*', gulp.series('styles:dev'));
  done();
});
