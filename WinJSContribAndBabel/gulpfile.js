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
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');


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

function babelPipe(sources) {
    return gulp.src(sources, { base : '.' })
        .pipe(plumber({errorHandler: onError}))
		.pipe(sourcemaps.init())
        .pipe(babel())        
        .pipe(rename(function(path){
        	var idx = path.basename.indexOf('.es6');
        	path.basename = path.basename.substr(0, idx);
        	path.extname = '.js';
        }))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest(''));
}

gulp.task('transpilescripts', function () {
    return babelPipe(['Flickity/**/*.es6.js', '!Flickity/**/bin/**/*.es6.js', '!Flickity/**/bld/**/*.es6.js']);
});


gulp.task('watch', function() {
	gulp.watch(
		['Flickity/**/*.es6.js', '!Flickity/**/bin/**/*.es6.js', '!Flickity/**/bld/**/*.es6.js'], 
		function(vinyl){
			console.log('babel transpile ' + vinyl.path);
			return babelPipe(vinyl.path);
		}
	);	
	gulp.watch(['Flickity/**/*.less', '!Flickity/**/bin/**/*.less', '!Flickity/**/bld/**/*.less'], ['styles']);	
});

gulp.task('default', ['clean', 'styles'], function() {
});