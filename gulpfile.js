var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')

sass.compiler = require('node-sass');

var browserSync = require('browser-sync').create()


gulp.task("sass", function() {
  return gulp.src('src/css/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      cleanCss({
        compatibility: 'ie8'
      })
    )
    .pipe(sourcemaps.write())

    .pipe(gulp.dest("dist"))

    .pipe(browserSync.stream())
})

gulp.task("html", function () {
  return gulp.src("src/index.html")
    .pipe(gulp.dest("dist"))
})

gulp.task("fonts", function () {
  return gulp.src("src/fonts/*")
    .pipe(gulp.dest("dist/fonts"))
})

gulp.task("img", function () {
  return gulp.src("src/img/*")
    .pipe(gulp.dest("dist/img"))
})

gulp.task("watch", function () {

  browserSync.init({
    server: {
      baseDir: "dist"
    }
  })

  gulp.watch("src/index.html", ["html"]).on("change", browserSync.reload)
  gulp.watch("src/css/style.scss", ["sass"])
  gulp.watch("src/fonts/*", ["fonts"])
  gulp.watch("src/img/*", ["img"])
})

gulp.task('default', ["html", "sass", "fonts", "img", "watch"]);
