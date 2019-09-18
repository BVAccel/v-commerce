var gulp = require("gulp");
var svgstore = require("gulp-svgstore");
var inject = require("gulp-inject");

gulp.task("icons", function() {
  var svgs = gulp.src("src/icons/**/*.svg").pipe(svgstore({ inlineSvg: true }));

  function fileToString(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src(["src/snippets/icon-store.liquid"])
    .pipe(inject(svgs, { transform: fileToString }))
    .pipe(gulp.dest("dist/snippets"));
});

gulp.task("icons:watch", function(done) {
  gulp.watch("src/icons/**/*", gulp.series("icons"));
  done();
});
