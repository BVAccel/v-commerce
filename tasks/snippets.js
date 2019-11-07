var gulp = require('gulp');
var cache = require('gulp-cached');
var watch = require('gulp-watch');
var glob = require('glob');
var liquid = require('@tuanpham-dev/gulp-liquidjs');

var paths = ['src/styles/theme.scss', 'src/styles/checkout.scss', 'src/styles/templates/**/index.scss', 'src/styles/templates/**/critical.scss', 'src/scripts/layout/*.js', 'src/scripts/templates/**/*.js'];
var liquidPaths = ['src/snippets/style-tags.liquid', 'src/snippets/script-tags.liquid'];

function flattenPaths(paths) {
  return paths.reduce(function(all, path) {
    glob.sync(path).forEach(function(innerPath) {
      all.push(innerPath);
    });
    return all;
  }, []);
}

function getScriptName(path) {
  return path
    .replace('src/scripts/templates/', '')
    .replace('src/scripts/layout/', '')
    .replace('.js', '');
}

function getStylesheetName(path) {
  return path
    .replace('src/styles/templates/', '')
    .replace('src/styles/', '')
    .replace('/index.scss', '')
    .replace('.scss', '')
    .replace('/critical', '');
}

function getActiveFiles(paths) {
  paths = paths instanceof Array ? paths : [paths];
  var allPaths = flattenPaths(paths);
  return allPaths.reduce(function(found, path) {
    var isScript = path.indexOf('/scripts/') !== -1;
    var isStyle = path.indexOf('/styles/') !== -1;
    if (isScript) {
      if (!found.hasOwnProperty('scripts')) found['scripts'] = [];
      var name = getScriptName(path);
      var obj = { name: name };
      found.scripts.push(obj);
    } else if (isStyle) {
      var isCriticalStyle = path.indexOf('critical') !== -1;
      if (!found.hasOwnProperty('styles')) found['styles'] = [];
      var name = getStylesheetName(path);
      var obj = {
        name: name,
        critical: isCriticalStyle ? true : false,
      };

      // Check if it already exists
      var arrIndex = -1;
      var nameFoundInArray = found.styles.some(function(style, index) {
        if (style.name == name) {
          arrIndex = index;
          return true;
        }
      });

      // Replace it
      if (nameFoundInArray && arrIndex !== -1) {
        found.styles.splice(arrIndex, 1);
        found.styles.push(obj);
      } else {
        found.styles.push(obj);
      }
    }
    return found;
  }, {});
}

gulp.task('snippets', function() {
  var activeFiles = getActiveFiles(paths);
  return gulp
    .src(liquidPaths)
    .pipe(
      liquid({
        ext: '.liquid',
        data: activeFiles,
      }),
    )
    .pipe(cache('snippets'))
    .pipe(gulp.dest('dist/snippets'));
});

gulp.task('snippets:watch', function(done) {
  gulp.watch(['src/styles/*.scss', 'src/styles/templates/**/index.scss', 'src/styles/templates/**/critical.scss', 'src/scripts/templates/**/*.js', 'src/scripts/layout/*.js', 'src/snippets/style-tags.liquid', 'src/snippets/script-tags.liquid'], gulp.series('snippets'));
  done();
});
