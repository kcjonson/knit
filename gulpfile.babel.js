import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import concat from 'gulp-concat';

const serverFiles = ["src/server/**/*.js", "src/common/**/*.js"];
const clientFiles = ["src/client/**/*.js", "src/common/**/*.js"];

gulp.task('build', ['build-server'])

gulp.task('build-server', () => {
   return gulp.src()
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("."));
})

gulp.task('build-client', () => {

})

gulp.task('watch', ['build-server', 'build-client'])

gulp.task('watch-server', () => {
   return gulp.watch(serverFiles, ['build-server'])
})

gulp.task('watch-client', () => {
  return gulp.watch(clientFiles, ['build-client'])
})
