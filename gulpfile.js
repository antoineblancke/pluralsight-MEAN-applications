var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    karma = require('karma').server,
    nodemon = require('gulp-nodemon');

gulp.task('lint', function() {
    return gulp.src('public/app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('tdd', function(done){
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done);
});

gulp.task('default', function() {
    gulp.start('lint');
    gulp.start('tdd');
});

gulp.task('start', function(){
    nodemon({
        script:'server.js',
        ext: 'js html',
        env:{
            'NODE_ENV': 'development'
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('public/app/**/*.js', ['lint']);
});