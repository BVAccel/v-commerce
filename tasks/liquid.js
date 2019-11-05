// var gulpif = require('gulp-if');
var gulp = require('gulp');
// var flatten = require('gulp-flatten');
// var changed = require('gulp-changed');
var liquid = require('@tuanpham-dev/gulp-liquidjs');
var watch = require('gulp-watch');
var glob = require('glob');

var paths = ['src/styles/theme.scss', 'src/styles/templates/**/index.scss', 'src/styles/templates/**/critical.scss', 'src/scripts/templates/*.js', 'src/scripts/layout/*.js'];

// var liquidPaths = ['src/snippets/script-tags.liquid', 'src/snippets/script-tags.liquid'];
var liquidPaths = 'src/snippets/style-tags.liquid';

function getActiveFiles(paths) {
  paths = paths instanceof Array ? paths : [paths];

  var allPaths = paths.reduce(function(all, path) {
    glob.sync(path).forEach(function(innerPath) {
      all.push(innerPath);
    });
    return all;
  }, []);
  // Array
  var found = allPaths.reduce(function(found, path) {
    var isScript = path.indexOf('/scripts/') !== -1;
    var isStyle = path.indexOf('/styles/') !== -1;
    if (isScript) {
      if (!found.hasOwnProperty('scripts')) found['scripts'] = [];
      var name = path
        .replace('src/scripts/templates/', '')
        .replace('src/scripts/layout/', '')
        .replace('.js', '');
      found.scripts.push(name);
    } else if (isStyle) {
      var isCriticalStyle = path.indexOf('critical') !== -1;
      if (!found.hasOwnProperty('styles')) found['styles'] = [];
      var name = path
        .replace('src/styles/templates/', '')
        .replace('src/styles/', '')
        .replace('/index.scss', '')
        .replace('.scss', '')
        .replace('/critical', '');
      var obj = {};
      obj['name'] = name;
      obj['critical'] = isCriticalStyle ? true : false;
      // check if it already exists
      var arrIndex = -1;
      var isInArray = found.styles.some(function(style, index) {
        if (style.name == name) {
          arrIndex = index;
          return true;
        }
      });

      if (isInArray) {
        found.styles.splice(arrIndex, 1);
        found.styles.push(obj);
      } else {
        found.styles.push(obj);
      }
    }
    return found;
  }, {});
  return found;
}

gulp.task('liquid', function() {
  var activeFiles = getActiveFiles(paths);

  return gulp
    .src(liquidPaths)
    .pipe(
      liquid({
        ext: '.liquid',
        data: activeFiles,
        cache: true,
      }),
    )
    .pipe(gulp.dest('dist/snippets'));
});

gulp.task('liquid:watch', function(done) {
  gulp.watch(['src/styles/*.scss', 'src/styles/templates/**/index.scss', 'src/styles/templates/**/critical.scss', 'src/scripts/templates/*.js', 'src/scripts/layout/*.js', 'src/snippets/style-tags.liquid'], gulp.series('liquid'));
  done();
});
