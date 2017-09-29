import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import changed from 'gulp-changed';
import webpack from 'webpack-stream';
import template from 'gulp-template';



const src = ['./{core,routes,stores,util}/**/*.{js,jsx}', './Index.jsx', './app.js'];
const entry = './app.js';
const staticFiles = ['./index.html'];
const dest = './dist';
const destBundle = `${dest}/static`;
const destServer = `${dest}/server`;

gulp.task('build', ['build-bundle', 'build-unbundled'])


// Standalone site build

// Create the webpack bundle that will be used in the browser by clients
gulp.task('build-bundle', ['build-static'], () => {
  return gulp.src(entry)
    .pipe(changed(destBundle))
    .pipe(webpack(require('./webpack.config.babel.js'))) //eslint-disable-line
    .pipe(gulp.dest(destBundle));
});

// Build an HTML file to serve a staic version of the app. This can be used for
// running a pure client side appliction, or as an entry point for Cordova. This
// templates the index to empty.
gulp.task('build-static', () => {
  return gulp.src(staticFiles)
    .pipe(changed(destBundle))
    .pipe(template({initialData: ''})) // Static page will have no initial data
    .pipe(gulp.dest(destBundle));
});




// Build client assets to be served from a server

// Build the client code that will run server side. This code is not bundled, and
// has a diffrent eslintrc than the browser bundle does.
gulp.task('build-unbundled', ['copy-static'], () => {
  return gulp.src(src)
    .pipe(changed(destServer))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destServer));
})

// Copy the static assets to the unbundled distribution directory.
gulp.task('copy-static', () => {
  return gulp.src(staticFiles)
    .pipe(changed(destServer))
    .pipe(gulp.dest(destServer));
});
