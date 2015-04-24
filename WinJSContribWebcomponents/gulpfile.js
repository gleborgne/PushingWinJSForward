var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var del = require('del');
var rename = require('gulp-rename');

var onError = function(err) {
	notify.onError({
		title:    "Gulp",
		subtitle: "Failure!",
		message:  "Error: <%= error.message %>",
		sound:    "Beep"
	})(err);

	this.emit('end');
};


gulp.task('clean', function(cb) {
	//del(['Sources/prod'], cb)
});

gulp.task('styles', function() {
	return gulp.src(['Flickity/**/*.less', '!Flickity/**/bin/**/*.less', '!Flickity/**/bld/**/*.less'], { base : '.' })
	.pipe(plumber({errorHandler: onError}))
	.pipe(less())
	.pipe(gulp.dest(''));	
});

gulp.task('watch', function() {
	gulp.watch(['Flickity/**/*.less', '!Flickity/**/bin/**/*.less', '!Flickity/**/bld/**/*.less'], ['styles']);	
});

gulp.task('default', ['clean', 'styles'], function() {
});