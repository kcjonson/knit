import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import changed from 'gulp-changed';
import template from 'gulp-template';


const serverSrc = ['src/**/*'];
const serverDest = `dist`;




gulp.task('build', ['build-server'])


// Server Code

// Build the assets to run the server
gulp.task('build-server', () => {
  return gulp.src(serverSrc)
    .pipe(changed(serverDest))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(serverDest));
});





// Watch

// gulp.task('watch', ['watch-server', 'watch-browser'])
//
// gulp.task('watch-server', () => {
//    return gulp.watch([serverSrc, clientSrc, clientStatic], ['build-server'])
// })
//
// gulp.task('watch-browser', () => {
//   return gulp.watch([clientSrc, clientStatic], ['build-browser-client'])
// })
