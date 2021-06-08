const browserify = require('browserify');
const sourcemapify = require('@jsdevtools/sourcemapify');
const babelify = require('babelify');
const {createWriteStream} = require("fs");

browserify({basedir: 'src'})
    .plugin(sourcemapify, {base: 'build'})
    .transform(babelify.configure({
        presets: ['@babel/preset-env']
    }))
    .bundle()
    .pipe(createWriteStream('build/webmarine.js', 'utf8'));
