const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const gulpif = require('gulp-if');
const del = require('del');
let isProd = true;

gulp.task('html', function () {
  return gulp.src('app/*.html')
  .pipe(gulp.dest('public/'));
});

gulp.task('styles', function () {
  return gulp.src('app/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulpif(isProd, autoprefixer({
    browsers : ['last 15 versions', '> 1%', 'ie 8', 'ie 7']
  })))
  .pipe(gulpif(isProd, cleanCSS()))
  .pipe(gulp.dest('public/css'));
})

gulp.task('scripts', function () {
  return gulp.src('app/js/*.js')
  .pipe(concat('scripts.js'))
  .pipe(gulpif(isProd, uglify()))
  .pipe(gulp.dest('public/js'));
})

gulp.task('img', function () {
  return gulp.src('app/img/**')
  .pipe(gulp.dest('public/img'));
})

gulp.task('clean', function () {
  return del('public');
})

gulp.task('watch', function () {
  gulp.watch('app/*.html', gulp.series('html'));
  gulp.watch('app/scss/**/*.scss', gulp.series('styles'));
  gulp.watch('app/js/**/*.js', gulp.series('scripts'));
})

gulp.task('fonts', function () {
  return gulp.src('app/libs/Font-Awesome/webfonts/**/*.*')
  .pipe(gulp.dest('public/webfonts'));
})

gulp.task('serve', function () {
  browserSync.init({
    server : 'public'
  });
  browserSync.watch('app/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean', 'html', 'styles', 'fonts', 'scripts', 'img'));
gulp.task('dev', gulp.series('build', gulp.parallel('serve', 'watch')));
