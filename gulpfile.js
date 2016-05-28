var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var sh = require('shelljs');
var historyApiFallback = require('connect-history-api-fallback');
var replace = require('gulp-replace');

// === PATHS
var paths = {
    sass: ['./scss/**/*.scss'],
    js: ['./www/**/*.js']
};

// === DEFAULT TASK
gulp.task('default', ['serve']);

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.instance = browserSync.init({
        startPath: '/index.html',
        server: {
            baseDir: "./www",
            middleware: [
                historyApiFallback()
            ]
        },
        port: 8100
    });

    // === WATCH
    gulp.watch(paths.sass, ['sass']);
    gulp.watch("www/**/*").on('change', browserSync.reload);
    // gulp.watch(paths.js, [browserSync.reload]);

    gutil.log(gutil.colors.green('\n\n•••••••••••••••••••••••••••••••••••••\n'),
        gutil.colors.yellow('  SERVER RUNNING...'),
        gutil.colors.green('\n•••••••••••••••••••••••••••••••••••••\n\n'));

});

// === COMPILE TASKS
gulp.task('sass', function() {
    return gulp.src(paths.sass)
        .pipe(concat('style.scss'))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('./www/css/'))
        .pipe(browserSync.stream());
});
