const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('sass', compilasass);
gulp.task('watch', watch);
gulp.task('mainjs', gpJS);
gulp.task('browser', browser)
gulp.task('pluginsjs', plugins);
gulp.task('default', gulp.parallel('watch', 'browser', 'sass', 'mainjs', 'pluginsjs'));


function watch(){
  gulp.watch('css/scss/*.scss', compilasass);
  gulp.watch('js/main/*.js', gpJS);
  gulp.watch('js/plugins/*.js', plugins);
  gulp.watch('*html').on('change', browserSync.reload)
}

function compilasass () {
  return gulp.src('css/scss/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('css/compild/'))
  .pipe(browserSync.stream());
}

function browser () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}

function gpJS(){
  return gulp.src('js/main/*.js')
  .pipe(concat('index.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream());
}

function plugins(){
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/moment/min/moment.min.js'
  ])
  .pipe(concat('plugins.js'))
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream());
}