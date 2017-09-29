import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import changed from 'gulp-changed';
import template from 'gulp-template';


const src = ['src/**/*'];
const dest = `dist`;


gulp.task('build', ['build-server'])


// Server Code

// Build the assets to run the server
gulp.task('build-server', () => {
  return gulp.src(src)
    .pipe(changed(dest))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest));
});

// Watch

gulp.task('watch', () => {
   return gulp.watch([src], ['build-server'])
})
