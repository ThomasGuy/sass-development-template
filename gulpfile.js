const gulp = require('gulp');
// const harp = require('harp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const prefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const beeper = require('beeper');

const { reload, stream } = browserSync;

// Error helper
function onError(err) {
  beeper();
  console.log('Name:', err.name);
  console.log('Reason:', err.reason);
  console.log('File:', err.file);
  console.log('Line:', err.line);
  console.log('Column:', err.column);
}

// Static Server + watching sass/html files
gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: './app'
  });
  gulp.watch('app/stylesheets/**/*.scss', ['sass']);
  gulp.watch('app/*.html').on('change', reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => gulp
  .src('app/stylesheets/main.scss')
  .pipe(sourcemaps.init())
  .pipe(plumber({
    errorHandler: onError
  }))
  .pipe(sass())
  .pipe(prefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('app/css'))
  .pipe(stream()));

gulp.task('default', ['serve']);
