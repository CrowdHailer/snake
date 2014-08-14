var gulp = require('gulp');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var merge = require('merge-stream');
var jslint = require('gulp-jslint');
var extend = require('xtend');
var size = require('gulp-size');
var uglify = require('gulp-uglify');

gulp.task('build', function () {
    return gulp.src('src/browser.js')
        .pipe(browserify())
        .pipe(size())
        // .pipe(uglify())
        // .pipe(size())
        .pipe(gulp.dest('./dist'))
})

gulp.task('buildTest', function () {
    var js = gulp.src('test/index.js')
        .pipe(browserify());

    var html = gulp.src('test/index.html');

    merge(html, js)
        .pipe(gulp.dest('./tmp/'))
        .pipe(connect.reload());
});

gulp.task('serve', function () {
    connect.server({
        root: ['tmp', 'test'],
        port: 8080,
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch(['./test/**/*', './src/**/*'], ['buildTest']);
});

gulp.task('lint', function () {
    var lintSettings = require('./.jslint.json');
    var source = gulp.src(['src/*.js', '!src/browser.js'])
        .pipe(jslint(lintSettings));

    var tests = gulp.src(['test/**/*.js', '!test/bower_components/**/*'])
        .pipe(jslint(extend(lintSettings, {
            predef: [
                'jasmine',
                'describe',
                'xdescribe',
                'beforeEach',
                'afterEach',
                'expect',
                'it',
                'xit'
            ]
        })));

    return merge(source, tests)
        .pipe(size());
});

gulp.task('test', ['buildTest', 'serve', 'watch']);