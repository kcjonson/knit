import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import changed from 'gulp-changed';
import template from 'gulp-template';

const dest = 'dist/';

const serverSrc = ['src/server-api/**/*.js'];
const serverDest = `${dest}/server`;
const serverClientDest = `${dest}/client`;



gulp.task('build', ['build-server'])


// Server Code

// Build the assets to run the server
gulp.task('build-server', ['build-server-client'], () => {
  return gulp.src(serverSrc)
    .pipe(changed(serverDest))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(serverDest));
})

// Build the assets to run the client application o n the server
gulp.task('build-server-client'], () => {
  return gulp.src(clientSrc)
    .pipe(changed(serverClientDest))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(serverClientDest));
})



// Watch

gulp.task('watch', ['watch-server', 'watch-browser'])

gulp.task('watch-server', () => {
   return gulp.watch([serverSrc, clientSrc, clientStatic], ['build-server'])
})

gulp.task('watch-browser', () => {
  return gulp.watch([clientSrc, clientStatic], ['build-browser-client'])
})
