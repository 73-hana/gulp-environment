const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));

function launchBrowserSync(cb) {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
  cb();
}

function copyHtml() {
  return gulp
    .src("src/**/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.reload({ stream: true }));
}

function compileSass() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}

function watchFiles() {
  gulp.watch("src/**/*.html", copyHtml);
  gulp.watch("src/scss/**/*.scss", compileSass);
}

exports.default = gulp.series(
  copyHtml,
  compileSass,
  launchBrowserSync,
  watchFiles,
);
