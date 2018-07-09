'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default', ['sass', 'sass:watch', 'html', 'html:watch', 'browser-sync', 'maps']);

gulp.task('sass', function () {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(reload({stream:true}))
    .pipe(gulp.dest('./dist/css'));
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

// Needed to ensure /dist/maps files exist
gulp.task('maps', function(){
  gulp.src('maps/*')
    .pipe(gulp.dest('dist/maps'))
});

gulp.task('browser-sync', function() {
  browserSync({
      server: {
          baseDir: 'dist/'
      }
  });
});
