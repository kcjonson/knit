import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import changed from 'gulp-changed';
import webpack from 'webpack-stream';
import template from 'gulp-template';

const dest = 'dist/';

const serverSrc = ['src/server/**/*.js'];
const serverDest = `${dest}/server`;
const serverClientDest = `${dest}/client`;

const clientSrc = ['src/client/**/*.{js,jsx}']
const clientEntry = 'src/client/app.js';
const clientStatic = ['src/client/index.html']
const clientDest = 'public';

gulp.task('build', ['build-server', 'build-browser-client'])


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
gulp.task('build-server-client', ['build-server-client-static'], () => {
  return gulp.src(clientSrc)
    .pipe(changed(serverClientDest))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(serverClientDest));
})

gulp.task('build-server-client-static', () => {
  return gulp.src(clientStatic)
    .pipe(changed(serverClientDest))
    .pipe(gulp.dest(serverClientDest));
})


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
    .pipe(template({initialData: ""})) // Static page will have no initial data
    .pipe(gulp.dest(clientDest));
})

// Watch

gulp.task('watch', ['watch-server', 'watch-browser'])

gulp.task('watch-server', () => {
   return gulp.watch([serverSrc, clientSrc, clientStatic], ['build-server'])
})

gulp.task('watch-browser', () => {
  return gulp.watch([clientSrc, clientStatic], ['build-browser-client'])
})
