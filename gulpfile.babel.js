import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import changed from 'gulp-changed';

const serverSrc = ['src/server/**/*.js'];
const serverDest = 'dist';

const clientSrc = ['src/client/**/*.js'];
const clientStatic = ['src/client/index.html']
const clientDest = 'public';

gulp.task('build', ['build-server', 'build-client'])

gulp.task('build-server', () => {
  return gulp.src(serverSrc)
    .pipe(changed(serverDest))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(serverDest));
})

gulp.task('build-client', ['copy-client-static'], () => {

})

gulp.task('copy-client-static', () => {
  return gulp.src(clientStatic)
    .pipe(gulp.dest(clientDest));
})

gulp.task('watch', ['watch-server', 'watch-client'])

gulp.task('watch-server', () => {
   return gulp.watch(serverSrc, ['build-server'])
})

gulp.task('watch-client', () => {
  return gulp.watch(clientSrc, ['build-client'])
})
