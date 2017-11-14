var gulp        = require('gulp');
var harp        = require('harp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var prefixer    = require('gulp-autoprefixer');
var reload      = browserSync.reload;
var plumber     = require('gulp-plumber');
var beeper      = require('beeper');

// Error Helper
function onError(err) {
  beeper();
  console.log('Name:', err.name);
  console.log('Reason:', err.reason);
  console.log('File:', err.file);
  console.log('Line:', err.line);
  console.log('Column:', err.column);
  //this.emit('end');
}

// Static Server + watching sass/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
      server: './app'
    });
    gulp.watch('app/css/**/*.sass', [ 'sass']);
    gulp.watch('app/*.html').on('change', reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass',function() {
  return gulp.src('app/css/sass/main.sass')
    .pipe(plumber({
      errorHandler : onError
      }))
    .pipe(sass())
    .pipe(prefixer({
              browsers: ['last 2 versions'],
              cascade: false
          }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
