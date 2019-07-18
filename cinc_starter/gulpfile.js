const gulp = require('gulp'); // Подключаем gulp
const concat = require('gulp-concat'); // Подключаем соединение файлов
const del = require('del'); // Подключаем удаление файлов
const sass = require('gulp-sass'); // Подключаем sass
const autoprefixer = require('gulp-autoprefixer'); // Подключаем добавление префиксов css
const cleanCSS = require('gulp-clean-css'); // Подключаем минификацию css
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create(); // Подключаем Browser Sync
const gulpif = require('gulp-if');
let isProd = false;

gulp.task('html',  function(){
    return gulp.src('frontend/pages/*.html')
    .pipe(gulp.dest('public/'));
});

gulp.task('fonts',  function(){
    return gulp.src('frontend/fonts/**/*.*')
    .pipe(gulp.dest('public/fonts'));
});

gulp.task('font-awesome',  function(){
    return gulp.src('frontend/libs/font-awesome/webfonts/**/*.*')
    .pipe(gulp.dest('public/webfonts'));
});


gulp.task('styles',  function(){
    return gulp.src('frontend/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulpif(isProd, autoprefixer({
        browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7']
    })))
    .pipe(gulpif(isProd, cleanCSS()))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts',  function(){
    return gulp.src('frontend/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulp.dest('public/js'));
});

// gulp.task('libScripts',  function(){
//     return gulp.src([
//       'frontend/libs/path_to_file',
//     ])
//     .pipe(concat('libs.js'))
//     .pipe(gulpif(isProd, uglify()))
//     .pipe(gulp.dest('public/js'));
// });

gulp.task('assets',  function(){
    return gulp.src('frontend/img/**/*.{png,gif,jpg,svg}')
    .pipe(gulp.dest('public/img'));
});

gulp.task('clean',  function(){
    return del('public');
});

gulp.task('serve', function() { // Создаем таск browser-sync
    browserSync.init({
        server: {
          baseDir:'public'
        }
    });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('watch', function() {
    gulp.watch('frontend/pages/*.html', gulp.series('html')); // Наблюдение за html файлами
    gulp.watch('frontend/scss/**/*.scss', gulp.series('styles')); // Наблюдение за sass файлами
    gulp.watch('frontend/js/**/*.js', gulp.series('scripts')); // Наблюдение за js файлами
});

gulp.task('build', gulp.series('clean', 'html', 'fonts', 'font-awesome', 'assets', 'styles', 'scripts'));

gulp.task('dev', gulp.series('build', gulp.parallel('serve', 'watch')));
