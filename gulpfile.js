// Grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    bower = require('gulp-bower'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create(),
    sftp = require('gulp-sftp'),
    fs = require('fs');

var sftpCredentials = JSON.parse(fs.readFileSync('./config/sftp.json'));

// Compile Sass, Autoprefix and minify
gulp.task('styles', function() {
    return gulp.src([
          './WorstTheme/assets/vendor/zephyr-common-styles/*.scss',
          './WorstTheme/assets/scss/**/*.scss'
        ])
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(sourcemaps.init()) // Start Sourcemaps
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./WorstTheme/assets/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.')) // Creates sourcemaps for minified styles
        .pipe(gulp.dest('./WorstTheme/assets/css/'))
});

// JSHint, concat, and minify JavaScript
gulp.task('site-js', function() {
  return gulp.src([

           // Grab your custom scripts
  		  './WorstTheme/assets/js/scripts/*.js'

  ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./WorstTheme/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(sourcemaps.write('.')) // Creates sourcemap for minified JS
    .pipe(gulp.dest('./WorstTheme/assets/js'))
});

// JSHint, concat, and minify Foundation JavaScript
gulp.task('foundation-js', function() {
  return gulp.src([

  		  // Foundation core - needed if you want to use any of the components below
          './WorstTheme/vendor/foundation-sites/js/foundation.core.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.util.*.js',

          // Pick the components you need in your project
          './WorstTheme/vendor/foundation-sites/js/foundation.abide.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.accordion.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.accordionMenu.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.drilldown.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.dropdown.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.dropdownMenu.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.equalizer.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.interchange.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.magellan.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.offcanvas.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.orbit.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.responsiveMenu.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.responsiveToggle.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.reveal.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.slider.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.sticky.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.tabs.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.toggler.js',
          './WorstTheme/vendor/foundation-sites/js/foundation.tooltip.js',
  ])
	.pipe(babel({
		presets: ['es2015'],
	    compact: true
	}))
    .pipe(sourcemaps.init())
    .pipe(concat('foundation.js'))
    .pipe(gulp.dest('./WorstTheme/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(sourcemaps.write('.')) // Creates sourcemap for minified Foundation JS
    .pipe(gulp.dest('./WorstTheme/assets/js'))
});

// Update Foundation with Bower and save to /WorstTheme/vendor
gulp.task('bower', function() {
  return bower({ cmd: 'update'})
    .pipe(gulp.dest('vendor/'))
});

// Browser-Sync watch files and inject changes
gulp.task('browsersync', function() {
    // Watch files
    var files = [
    	'./WorstTheme/assets/css/*.css',
    	'./WorstTheme/assets/js/*.js',
    	'**/*.php',
    	'assets/images/**/*.{png,jpg,gif,svg,webp}',
    ];

    browserSync.init(files, {
	    // Replace with URL of your local site
	    proxy: "http://localhost/",
    });

    gulp.watch('./WorstTheme/assets/scss/**/*.scss', ['styles']);
    gulp.watch('./WorstTheme/assets/js/scripts/*.js', ['site-js']).on('change', browserSync.reload);

});

// Watch files for changes (without Browser-Sync)
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('./WorstTheme/assets/scss/**/*.scss', ['styles']);

  // Watch site-js files
  gulp.watch('./WorstTheme/assets/js/scripts/*.js', ['site-js']);

  // Watch foundation-js files
  gulp.watch('./WorstTheme/vendor/foundation-sites/js/*.js', ['foundation-js']);

});

// Run styles, site-js and foundation-js
gulp.task('default', function() {
  gulp.start('styles', 'site-js', 'foundation-js');
});

gulp.task('deploy', function () {
  gulp.src('WorstTheme/**')
    .pipe(sftp(sftpCredentials));
});
