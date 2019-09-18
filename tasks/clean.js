
var gulp  = require('gulp');
var clean = require('gulp-clean');
var fs    = require('fs');

gulp.task('clean:dist', function (done) {
  if (fs.existsSync('dist')) {
    return gulp.src(['dist'], { read: false })
      .pipe(clean())
  } else {
    done();
  }
});
