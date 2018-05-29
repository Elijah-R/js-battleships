'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const minify = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const del = require('del');
const rename = require('gulp-rename');
const run = require('run-sequence');
const strip = require('gulp-strip-comments');
const uglify = require('gulp-uglify-es').default;
const pump = require('pump');
const webp = require('gulp-webp');
const pug = require('gulp-pug');

gulp.task('clean', function () {
  return del('build');
});

gulp.task('copy', function () {
  return gulp.src([
    // 'source/*.{png,svg,ico,xml,webmanifest}',
    // 'source/fonts/**/*.{woff,woff2}',
    // 'source/img/**'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('style', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('images', function () {
  return gulp.src('build/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));

});

gulp.task('webp', function () {
  return gulp.src('build/img/*.{jpg,png}')
    .pipe(webp({
      quality: 90,
      method: 6
    }))
    .pipe(gulp.dest('build/img'));
});

gulp.task('stripHtml', function () {
  return gulp.src('source/*.html')
    .pipe(strip.html())
    .pipe(gulp.dest('build'));
});

gulp.task('minJs', function (cb) {
  pump([
      gulp.src('source/js/*.js'),
      // uglify(),
      rename({
        suffix: '.min'
      }),
      gulp.dest('build/js/')
    ],
    cb
  );
});

gulp.task('serve', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', ['style']).on('change', server.reload);
  gulp.watch('source/js/*.js', ['minJs']).on('change', server.reload);
  // gulp.watch('source/*.pug', ['pughtml']);
  gulp.watch('source/**/*.pug', ['pughtml']);
  gulp.watch('source/*.html', ['stripHtml']).on('change', server.reload);
});

gulp.task('pughtml', function () {
  return gulp.src('source/*.pug')
    .pipe(pug({
      doctype: 'html',
      pretty: true
    }))
    .pipe(gulp.dest('source'));
});

gulp.task('build', function (done) {
  run(
    'clean',
    'copy',
    'style',
    // 'images',
    // 'webp',
    'pughtml',
    'stripHtml',
    'minJs',
    done
  );
});
