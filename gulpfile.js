var gulp = require('gulp'),
      sass = require('gulp-sass'),
      imagemin = require("gulp-imagemin"),
      browserSync = require('browser-sync'),
      cleanCSS = require("gulp-clean-css"),
      autoprefixer = require("gulp-autoprefixer"),
      paths = {
            'sass': './src/sass/',
            'css': './build/css/',
            'scripts': './src/scripts/',
            'js': './build/js/',
            'images': './src/images/',
            'img': './build/img/'
      };


// Sass task: Compile SCSS files to CSS
gulp.task('sass', function () {
      var prefixSetting = autoprefixer({
            browsers: ["last 2 versions"]
      });

      return gulp.src(paths.sass + '*.scss')
            .pipe(sass())
            .on('error', function (err) {
                  console.log(err.toString());

                  this.emit('end');
            })
            .pipe(autoprefixer(prefixSetting))
            .pipe(cleanCSS())
            .pipe(gulp.dest(paths.css))
            .pipe(browserSync.reload({
                  stream: true
            })); // Reload browser
});

// Browser sync task: to launch a server and auto-reload
gulp.task('browser-sync', ['sass', 'scripts', 'imageMin'], function () {
      browserSync({
            server: {
                  baseDir: "."
            }
      });
});

// Scripts task: Compile TypeScript files to js
gulp.task('scripts', function () {
      return gulp.src(paths.scripts + '*.js')
            .pipe(gulp.dest(paths.js))
            .pipe(browserSync.reload({
                  stream: true
            })); // Reload browser
});

gulp.task('imageMin', function () {
      return gulp.src(paths.images + '*')
            .pipe(imagemin())
            .pipe(gulp.dest(paths.img));
});

// Reload browser
gulp.task('reload', function () {
      browserSync.reload();
});

// Watch task: watch for file changes and
// trigger appropriate task.
gulp.task('watch', function () {
      gulp.watch(paths.sass + '**/*.scss', ['sass']); // Watch sass files
      gulp.watch(paths.scripts + '**/*.js', ['scripts']); // Watch .js files
      gulp.watch('*.html', ['reload']); // Watch html files
      gulp.watch(paths.images, ['imageMin']); // Watch image files
});

// Default task: Run `gulp` to launch browser-sync
//and watch for file changes.
gulp.task('default', ['browser-sync', 'watch']);