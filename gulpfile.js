'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default', ['sass', 'js', 'html', 'assets', 'browser-sync', 'watch']);

gulp.task('watch', function() {
  gulp.watch('./src/styles/**/*.scss', ['sass']);
  gulp.watch('./*.html', ['html']);
  gulp.watch('./src/js/*.js', ['js']);
});

gulp.task('sass', function () {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(reload({stream:true}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream:true}));
});

gulp.task('js', function() {
  gulp.src('./src/js/*.js')
    .pipe(reload({stream:true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('assets', function() {
  gulp.src('./src/assets/*')
    .pipe(reload({stream:true}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('browser-sync', function() {
  browserSync({
    open: false,
    notify: false,
    server: {
      baseDir: 'dist/'
    },
  });
});
