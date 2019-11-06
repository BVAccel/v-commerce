var path = require('path');
var gulp = require('gulp');
var rename = require('gulp-rename');
var cache = require('gulp-cached');
var uglifyCSS = require('gulp-uglifycss');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var globalStylesPath = 'src/styles/theme.scss';
var templateStylesPath = 'src/styles/templates/**/index.scss';
var templateCriticalStylesPath = 'src/styles/templates/**/critical.scss';
var stylesDest = 'dist/assets';

var sassSettings = {
  includePaths: ['node_modules'],
};

gulp.task('styles:dev', function() {
  return (
    gulp
      // .src('src/styles/**/*.scss')
      .src([globalStylesPath, templateStylesPath, templateCriticalStylesPath])
      .pipe(sourcemaps.init())
      .pipe(sass(sassSettings).on('error', sass.logError))
      .pipe(postcss([autoprefixer()]))
      .pipe(cache('styles'))
      .pipe(sourcemaps.write())
      .pipe(
        rename(function(file) {
          file.extname = '.css.liquid';
          if (file.dirname !== '.') {
            if (file.basename === 'critical') {
              file.basename = `template.critical.${file.dirname}`;
            } else {
              file.basename = `template.${file.dirname}`;
            }
            file.dirname = '';
          }
          return file;
        }),
      )
      .pipe(gulp.dest(stylesDest))
  );
});

gulp.task('styles:prod', function() {
  return gulp
    .src([globalStylesPath, templateStylesPath, templateCriticalStylesPath])
    .pipe(sourcemaps.init())
    .pipe(sass(sassSettings).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(uglifyCSS())
    .pipe(cache('styles'))
    .pipe(sourcemaps.write())
    .pipe(
      rename(function(file) {
        file.extname = '.css.liquid';
        if (file.dirname !== '.') {
          if (file.basename === 'critical') {
            file.basename = `template.critical.${file.dirname}`;
          } else {
            file.basename = `template.${file.dirname}`;
          }
          file.dirname = '';
        }
        return file;
      }),
    )
    .pipe(gulp.dest(stylesDest));
});

gulp.task('styles:watch', function(done) {
  gulp.watch('src/styles/**/*', gulp.series('styles:dev'));
  done();
});
