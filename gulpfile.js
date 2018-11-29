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
  return gulp.src("src/*.html")
    .pipe(gulp.dest("dist"))
})

gulp.task("insight-pages", function () {
  return gulp.src("src/insight-pages/*")
    .pipe(gulp.dest("dist/insight-pages"))
})

gulp.task("hypotheses", function () {
  return gulp.src("src/insight-pages/hyp/*")
    .pipe(gulp.dest("dist/insight-pages/hyp"))
})

gulp.task("business", function () {
  return gulp.src("src/insight-pages/bp/*")
    .pipe(gulp.dest("dist/insight-pages/bp"))
})

gulp.task("insight", function () {
  return gulp.src("src/insight-pages/insights/*")
    .pipe(gulp.dest("dist/insight-pages/insights"))
})


gulp.task("fonts", function () {
  return gulp.src("src/fonts/*")
    .pipe(gulp.dest("dist/fonts"))
})

gulp.task("img", function () {
  return gulp.src("src/img/*")
    .pipe(gulp.dest("dist/img"))
})

gulp.task("javascript", function () {
  return gulp.src("src/js/*")
    .pipe(gulp.dest("dist/js"))
})

gulp.task("watch", function () {

  browserSync.init( ["css/*.css"], {
    server: {
      baseDir: "dist"
    }
  })

  gulp.watch("src/*.html", ["html"]).on("change", browserSync.reload)
  gulp.watch("src/insight-pages/*.html", ["insight-pages"])
  gulp.watch("src/insight-pages/insights/*.html", ["insight"]).on("change", browserSync.reload)
  gulp.watch("src/css/style.scss", ["sass"])
  gulp.watch("src/insight-pages/hyp/*", ["hypotheses"])
  gulp.watch("src/insight-pages/bp/*", ["business"])
  gulp.watch("src/fonts/*", ["fonts"])
  gulp.watch("src/img/*", ["img"])
  gulp.watch("src/js/*", ["javascript"])
})

gulp.task('default', ["html", "sass", "insight", "hypotheses", "business", "insight-pages", "fonts", "img", "javascript", "watch"]);
