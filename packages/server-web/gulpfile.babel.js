import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import changed from 'gulp-changed';

const src = ['src/**/*'];
const dest = 'dist';


// Server Code

// Build the assets to run the server
gulp.task('build', () => {
  return gulp.src(src)
    .pipe(changed(dest))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest));
});


// Watch

gulp.task('watch', () => {
   return gulp.watch([src], ['build'])
})
