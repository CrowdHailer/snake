var gulp = require('gulp');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var merge = require('merge-stream');
var jslint = require('gulp-jslint');
var extend = require('xtend');

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
    gulp.src(['src/*.js'])
        .pipe(jslint(lintSettings));

    gulp.src(['test/**/*.js', '!test/bower_components/**/*'])
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
});

gulp.task('test', ['buildTest', 'serve', 'watch']);