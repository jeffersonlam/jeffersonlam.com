'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default', ['sass', 'sass:watch', 'js', 'js:watch', 'html', 'html:watch', 'browser-sync',]);

gulp.task('sass', function () {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(reload({stream:true}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/styles/**/*.scss', ['sass']);
});

gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream:true}));
});

gulp.task('html:watch', function() {
  gulp.watch('./*.html', ['html']);
});


gulp.task('js', function() {
  gulp.src('./src/js/*.js')
    .pipe(reload({stream:true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('js:watch', function() {
  gulp.watch('./src/js/*.js', ['js']);
});

gulp.task('browser-sync', function() {
  browserSync({
      server: {
          baseDir: 'dist/'
      }
  });
});
