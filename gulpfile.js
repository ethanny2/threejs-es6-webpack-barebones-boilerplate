const gulp = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const del = require('del');
settings = require('./settings');

// settings.productionDirectory = __dirname + '/dist';
// settings.devDirectory = __dirname + '/app';

gulp.task('clean', function() {
	return del(['dist/**/*']);
});

/*  Task to compile SASS to CSS, post process the output SASS

*/
gulp.task('styles', function() {
	return gulp
		.src('./src/sass/**/*.scss')
		.pipe(
			sass({
				outputStyle: 'nested',
				precision: 10,
				includePaths: ['.'],
				onError: console.error.bind(console, 'Sass error:'),
			})
		)
		.pipe(autoprefixer())
		.pipe(csso())
		.pipe(gulp.dest(settings.productionDirectory + '/css'));
});


gulp.task('build', function() {
	return gulp.src('./src/js/index.js')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest('./dist'));
});

/*
    Gulp task for building project  by running web pack in series with GULP tasks
    that parse styles and starts by emptying the production folder.
*/

gulp.task(
	'build-clean',
	gulp.series('clean', 'styles', 'build',function(callback) {
		callback();
	})
);
/*
    Gulp task for building project  by running web pack so that only the HTML, static assets, existing CSS files
    and the javascripts are bundled and minified.
*/
// gulp.task('build', function(callback) {
// 	webpack(webpackConfig, function(err, stats) {
// 		if (err) {
// 			console.log(err.toString());
// 		}
// 		if (stats.hasErrors()) {
// 			return new Error(stats.compilation.errors.join('\n'));
// 		}
// 		console.log(stats.toString());
// 	});
// 	callback();
// });




/* Gulp task to start hot reload browser sync dev server used with liveServer extension*/
gulp.task('serve', function(callback) {
	browserSync.init({
		notify: false,
		ghostMode: false,
		proxy: settings.liveServerUrl,
	});
	callback();
});

/*Watches for all changes to JS, CSS/SASS, files.*/
gulp.task(
	'watch',
	gulp.series('build-clean', 'serve', function(callback) {
		//Watch for SASS changes, at same time parse to optimzed CSS to inject new styles
		gulp.watch('./src/sass/**/*.scss', gulp.parallel('waitForStyles'));

		//Watch for Changes to JS files and HTML files (both built/bundled with webpack)
		gulp.watch('./src/js/**/*.js', gulp.parallel('waitForJSandHtml'));
	})
);

/* Helper task to rebuild/re-run webpack and then reload the browserSync Instance. Only 
deals with waitting for JS and HTML files since that is what webpack handles*/
gulp.task(
	'waitForJSandHtml',
	gulp.series('build', function(callback) {
		browserSync.reload();
		callback();
	})
);


/* Helper for asynchronously loading new styles and injecting them into the live server*/
gulp.task(
	'waitForStyles',
	gulp.series('styles', function() {
		return gulp
			.src(settings.productionDirectory + '/css/styles.css')
			.pipe(browserSync.stream());
	})
);
