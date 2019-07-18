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

gulp.task('pages', function () {
  return gulp.src('app/pages/**/*.*')
  .pipe(gulp.dest('public/pages'));
});

gulp.task('php', function () {
  return gulp.src('app/PHP/*.php')
  .pipe(gulp.dest('public/PHP/'));
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
  return gulp.src('app/js/**/*.js')
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
  gulp.watch('app/pages/**/*.php', gulp.series('pages'));
  gulp.watch('app/fonts/**/*.*', gulp.series('fonts'));
  gulp.watch('app/pages/.htaccess', gulp.series('htaccess'));
  gulp.watch('app/PHP/*.php', gulp.series('php'));
  gulp.watch('app/scss/**/*.scss', gulp.series('styles'));
  gulp.watch('app/js/**/*.js', gulp.series('scripts'));
  gulp.watch('app/img/**/*.*', gulp.series('img'));
})

gulp.task('animate', function () {
  return gulp.src('app/libs/animate.css/**/*.*')
  .pipe(gulp.dest('public/libs/animate'));
})

gulp.task('webfonts', function () {
  return gulp.src('app/libs/Font-Awesome/webfonts/**/*.*')
  .pipe(gulp.dest('public/webfonts'));
})

gulp.task('bootstrap', function () {
  return gulp.src('app/libs/bootstrap/dist/css/*.*')
  .pipe(gulp.dest('public/libs/bootstrap'));
})

gulp.task('jquery', function () {
  return gulp.src('app/libs/jquery/dist/**/*.*')
  .pipe(gulp.dest('public/libs/jquery'));
})

gulp.task('libs', gulp.series('animate','webfonts', 'bootstrap', 'jquery'));

gulp.task('fonts', function () {
  return gulp.src('app/fonts/**/*.*')
  .pipe(gulp.dest('public/fonts'));
})

gulp.task('htaccess', function () {
  return gulp.src('app/pages/.htaccess')
  .pipe(gulp.dest('public/pages'));
})

gulp.task('serve', function () {
  browserSync.init({
    proxy: "vitdub.com/inet_shop/public/pages/index.php",
    open : 'external',
    port:      80,
  });
  browserSync.watch('app/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean', 'pages', 'styles', 'htaccess', 'fonts', 'php', 'scripts', 'img', 'libs'));
gulp.task('dev', gulp.series('build', gulp.parallel('serve', 'watch')));
