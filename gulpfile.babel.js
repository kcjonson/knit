import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import concat from 'gulp-concat';

/*
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
*/

gulp.task('build', ['build-server'])

gulp.task('build-server', () => {
  return gulp.src("src/server/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("index.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("."));
})

gulp.task('build-client', () => {

})
