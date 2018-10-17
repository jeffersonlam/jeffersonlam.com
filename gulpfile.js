'use strict';

const { task, src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

// Build & Deploy
const del = require('del');
const rename = require('gulp-rename');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const ghpages = require('gulp-gh-pages');

task('styles', () => {
  return src('./src/styles/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(reload({stream:true}))
    .pipe(dest('./dist'));
});

task('styles:build', () => {
  return src('./src/styles/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(csso())
    .pipe(rename('styles.css'))
    .pipe(dest('./build'));
});

task('html', () => {
  return src('./src/**/*.html')
    .pipe(reload({stream:true}))
    .pipe(dest('./dist'));
});

task('html:build', () => {
  return src('./src/**/*.html')
    .pipe(dest('./build'));
});

task('watch', () => {
  watch('./src/**/*.html', parallel('html', d => d()));
  watch('./src/styles/**/*.scss', parallel('styles', d => d()));
  watch('./src/js/**/*.js', parallel('js', d => d()));
});

task('js', () => {
  return src('./src/js/*.js')
    .pipe(reload({stream:true}))
    .pipe(dest('dist'));
});

task('js:build', () => {
  return src('./src/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(dest('build'));
});

task('bs', () => {
  browserSync({
    server: {
        baseDir: 'dist/'
    },
    open: false,
    notify: false
  });
});

task('bs:build', () => {
  browserSync({
    server: {
        baseDir: 'build/'
    },
    open: false,
    notify: false
  });
});

task('clean', () => {
  return del(['build/**/*']);
});

task('ghpages', function () {
  return src("./build/**/*")
    .pipe(ghpages())
});

task('default',
  series(
    parallel('html', 'styles', 'js'),
    parallel('bs', 'watch')
  )
);
task('build',
  series(
    'clean',
    parallel('styles:build', 'html:build', 'js:build'),
    'bs:build'
  )
);
