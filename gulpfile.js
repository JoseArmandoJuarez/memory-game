

const { series, parallel, src, dest } = require('gulp');
const del = require('del');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

function clean(cb){
    //body omitted
    return del('dist');
    cb();
}

//converts sass to css
function css(cb){

    return src('src/scss/*')
    .pipe(sass())
    .pipe(dest('dist/css/'))
    
    cb();
}

//---
function javascript(cb){

    return src('src/js/*')
    .pipe(dest('dist/js/'))

    cb();
}

//compreses images
function image(cb){

    //globbing (**) looks into subfolders for the file type names
    return src(['src/img/*.{jpg, png}',
                'src/img/*.{png, jpg}'])
    .pipe(dest("dist/img/"));

    cb();
}

//copies HTML files
function html(cb){

    return src('src/*')
    .pipe(dest("dist/"));

    cb();
}

exports.build = series(clean, parallel(css, javascript, image, html));