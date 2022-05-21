const path = require('path');
require('dotenv').config({ path: path.resolve('../../.env') });

const gulp = require('gulp');
const gulpless = require('gulp-less');
const postcss = require('gulp-postcss');
const debug = require('gulp-debug');
var csso = require('gulp-csso');
const autoprefixer = require('autoprefixer');
const NpmImportPlugin = require('less-plugin-npm-import');
const gulpBrowserify = require('gulp-browserify');
const reactify = require('reactify');
const envify = require('envify');

gulp.task('less', function () {
  const plugins = [autoprefixer()];

  return gulp
    .src('src/themes/*-theme.less')
    .pipe(debug({ title: 'Less files:' }))
    .pipe(
      gulpless({
        javascriptEnabled: true,
        plugins: [new NpmImportPlugin({ prefix: '~' })]
      })
    )
    .pipe(postcss(plugins))
    .pipe(
      csso({
        debug: true
      })
    )
    .pipe(gulp.dest('./public'));
});

var envParams = {};

function bundle() {
  return gulp
    .src('src/index.jsx')
    .pipe(
      gulpBrowserify({
        transform: ['reactify', ['envify', envParams]]
      })
    )
    .pipe(gulp.dest('./public'));
}

const walletAddress = 'test'; //process.env.WALLET_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

gulp.task('set-env-variables', function () {
  envParams = {
    WALLET_ADDRESS: walletAddress,
    PRIVATE_KEY: privateKey
  };
  console.log(walletAddress);
  return bundle();
});
