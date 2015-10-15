"use strict";

// Import Gulp and plugins
var gulp = require("gulp"),
	sass = require("gulp-sass"),
	autoprefixer = require('gulp-autoprefixer'),
	cssLint = require("gulp-csslint"),
	minifyCSS = require("gulp-minify-css"),
	jsHint = require("gulp-jshint"),
	uglify = require("gulp-uglify"),
	minifyHTML = require("gulp-minify-html"),
	rename = require("gulp-rename"),
	concat = require("gulp-concat"),
	templateCache = require('gulp-angular-templatecache'),
	eventStream = require("event-stream");

var Server = require("karma").Server;

var dist = "dist",
	src = "src",
	srcJs = [
		"src/**/*.module.js",
		"src/**/*.config.js",
		"src/**/*.js"
	],
	srcHtml = "src/index.html";

var vendorSrcJs = [
	"bower_components/angular/angular.min.js",
	"bower_components/angular-ui-router/release/angular-ui-router.min.js",
	"bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
	"bower_components/angular-animate/angular-animate.min.js",

];

var vendorSrcCss = [
	"bower_components/bootstrap/dist/css/bootstrap.min.css",

];

var vendorFonts = [
	"bower_components/bootstrap/dist/fonts/*"
];

// Default task
gulp.task("default", ["build", "watch"]);

//build app.js task
gulp.task('appjs', function() {
	return eventStream.merge(
		gulp.src(src + "/*/**/*.html")
			.pipe(templateCache( {
				standalone: true,
				module: 'templates'
			})),
		gulp.src(srcJs)
	)
		.pipe(concat('app.js'))
		.pipe(gulp.dest(dist + "/app"));
});

// SASS task
gulp.task("sass", function() {
	gulp.src(src + "/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer())
		.pipe(concat("app.css"))
		.pipe(gulp.dest(dist + "/app/"))
});

gulp.task("lint", function(){
	return gulp.src(src + "/*/**/*.js")
		.pipe(jsHint())
		.pipe(jsHint.reporter('default'))
});

// HTML task
gulp.task("html", function() {
	return eventStream.merge(
		gulp.src(srcHtml))
		.pipe(gulp.dest(dist))
});

// JSON task
gulp.task("json", function() {
	return eventStream.merge(
		gulp.src(src + "/**/*.json"))
		.pipe(gulp.dest(dist))
});

// JS task
gulp.task("js", function() {
	gulp.src(srcJs)
		.pipe(concat("app.js"))
		.pipe(gulp.dest(dist + "/app"))

});

// Vendor CSS and JavaScript
gulp.task("vendor", function() {
	return eventStream.merge(
		gulp.src(vendorSrcCss)
			.pipe(concat("vendor.min.css"))
			.pipe(gulp.dest(dist + "/vendor")),
		gulp.src(vendorSrcJs)
			.pipe(concat("vendor.min.js"))
			.pipe(gulp.dest(dist + "/vendor")),
		gulp.src(vendorFonts)
			.pipe(gulp.dest(dist + "/fonts"))
	);
});

// Watcher
gulp.task("watch", function() {
	gulp.watch(srcHtml, ["html"]);
	gulp.watch(src + "/**/*.scss", ["sass"]);
	gulp.watch(src + "/**/*.js", ["appjs"]);
	gulp.watch(src + "/*/**/*.html", ["appjs"]);
	gulp.watch(src + "/**/*.json", ["json"]);
});

gulp.task("build", ["vendor", "sass", "html", "json", "appjs"]);

// Testing
gulp.task("unit-test", function(done) {
	new Server({
		configFile: __dirname + "/karma.conf.js",
		singleRun: true
	}, done).start();
});

gulp.task("test-css", function(done) {
	gulp.src(src + "/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(cssLint())
		.pipe(cssLint.reporter())
});
