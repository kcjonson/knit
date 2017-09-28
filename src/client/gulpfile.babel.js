import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import changed from 'gulp-changed';
import webpack from 'webpack-stream';
import template from 'gulp-template';


const clientSrc = ['**/*.{js,jsx}']
const clientEntry = 'app.js';
const clientStatic = ['index.html']
const clientDest = '../../dist/public';

gulp.task('build', ['build-browser-client'])


// Browser Code

gulp.task('build-browser-client', ['build-browser-client-static'], () => {
  return gulp.src(clientEntry)
    .pipe(changed(clientDest))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(clientDest));
})

gulp.task('build-browser-client-static', () => {
  return gulp.src(clientStatic)
    .pipe(changed(clientDest))
    .pipe(template({initialData: ''})) // Static page will have no initial data
    .pipe(gulp.dest(clientDest));
})
