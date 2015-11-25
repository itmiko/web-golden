var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
	concatCss = require('gulp-concat-css'),
	rename = require('gulp-rename'),
	notify = require("gulp-notify"),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	minifyCss = require('gulp-minify-css');

//server connect
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

//css
gulp.task('css', function () {
  	gulp.src('css/*.css')
    .pipe(concatCss("bundle.css"))
    .pipe(autoprefixer({
    browsers: ['last 15 versions'],
    cascade: false
    }))
    .pipe(minifyCss())
    .pipe(rename("bundle.min.css"))
    .pipe(gulp.dest('app/css'))
    // .pipe(notify("Done!"))
    .pipe(connect.reload());
});

//html
gulp.task('html', function(){
	gulp.src('app/index.html')
    .pipe(connect.reload());
});

//watch
gulp.task('watch', function () {
  	gulp.watch('css/*.css', ['css'])
  	gulp.watch('app/index.html', ['html'])
});

//default
gulp.task('default', ['connect', 'html', 'css', 'watch']);//use this task when type "gulp" in consol 