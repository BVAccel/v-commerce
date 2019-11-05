var gulpif = require('gulp-if');
var gulp = require('gulp');
var flatten = require('gulp-flatten');
var changed = require('gulp-changed');
var watch = require('gulp-watch');

var paths = ['src/assets/**/*', 'src/config/**/*', 'src/layout/**/*', 'src/sections/**/*', 'src/snippets/**/*', 'src/templates/**/*', '!src/snippets/style-tags.liquid', '!src/snippets/script-tags.liquid'];

function isAccountTemplate(file) {
  return file.path.includes('templates/customers');
}

gulp.task('copy', function() {
  return gulp
    .src(paths, { base: 'src' })
    .pipe(gulpif(isAccountTemplate, flatten({ includeParents: 2 }), flatten({ includeParents: 1 })))
    .pipe(changed('dist/', { hasChanged: changed.compareContents }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:watch', function(done) {
  watch(paths, gulp.series('copy'));
  done();
});
