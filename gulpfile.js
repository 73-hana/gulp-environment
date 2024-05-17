const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const bs = require('browser-sync').create();
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');

// launch browser-sync
bs.init({
  server: {
    baseDir: 'dist'
  }
});

function compileSass() {
  return gulp
    .src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(bs.stream());
}

function compileEjs() {
  return gulp
    .src('src/**/*.ejs')
    .pipe(ejs({ ext: '.html' }).on('error', console.log))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('dist'))
}

gulp.watch('src/**/*.ejs', compileEjs);
gulp.watch('src/sass/**/*.scss', compileSass);
// EJSがコンパイルされた後にブラウザをリロード
gulp.watch('dist/**/*.html').on('change', bs.reload);

exports.default = gulp.series(compileSass, compileEjs);