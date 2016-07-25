/* Gulp Dependencies */
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	livereload = require('gulp-livereload'),
	uglifycss = require('gulp-uglifycss');

//Script tasks
gulp.task('scripts',function(){
	gulp.src('js/source/*.js')
		.pipe(uglify({mangle: false}))
		.pipe(concat('app.js'))
		.pipe(gulp.dest('js/build/'))
		.pipe(livereload());
});	

gulp.task('css',function(){
	gulp.src('css/source/*.css')
	.pipe(uglifycss({mangle: false}))
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('css/build/'))
	.pipe(livereload());
});

gulp.task('html',function(){
	gulp.src('*.html')
	.pipe(livereload());
});

//Watch task
gulp.task('watch',function(){
	livereload.listen();
	gulp.watch('js/source/*.js',['scripts']);
	gulp.watch('css/source/*.css',['css']);
	gulp.watch('*.html',['html']);
});

//default gulp task
gulp.task('default',['scripts','css','watch'])