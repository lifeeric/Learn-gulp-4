const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify')
const uglyfily = require('gulp-uglifycss');
const browserSync = require('browser-sync').create();

function style() {

   // whis is scss
   return gulp.src('./scss/*.scss')
   // pass that file througth sass compiler  
   .pipe(sass().on('error', sass.logError))
   // where do I save
   .pipe(gulp.dest('./css'))
   //4 stream changes to all browser 
   .pipe(browserSync.stream());

}

/** Minified  */

function mini () {
    //where is
    return gulp.src('./css/*.css')

    // pass through the compiler
    .pipe(uglyfily({
        "uglyComments": true
    }))
    
    // past it
    .pipe(gulp.dest('./dist/'))
}

function miniJs () {
    // where is file
    return gulp.src('./js/*.js')

    // compiler
    .pipe(uglify())

    // where to save
    .pipe(gulp.dest('./dist/'))
}


function watch() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });

    gulp.watch('./scss/*.scss', style);
    gulp.watch('./css/*.css', mini);
    gulp.watch('./js/*.js', miniJs)
    gulp.watch('./*html').on('change', browserSync.reload);
    gulp.watch('./js/*.js').on('change', browserSync.reload)
}

exports.style = style;
exports.watch = watch;