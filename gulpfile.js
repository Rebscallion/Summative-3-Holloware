//declare dependencies
const jshint = require('gulp-jshint');
const gulp = require('gulp');
const sassLint = require('gulp-sass-lint');
const { watch } = require('gulp');

gulp.task('jshint', () => {
    return gulp.src('js/script.js')
        .pipe(jshint({ "esversion": 6 }))
        .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('sass-lint', () => {
    return gulp.src('css/styles.scss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
})

gulp.task('watch', () => {
    gulp.watch('js/*.js', gulp.series('jshint')),
        gulp.watch('css/**/*.scss', gulp.series('sass-lint'))
}) 