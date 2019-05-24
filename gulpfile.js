var gulp = require('gulp');
var watch = require('gulp-watch');
//压缩html
var htmlClean = require('gulp-htmlclean');
//压缩js
var uglify = require('gulp-uglify');
//去除js中的debug及console.log
var stripDebug = require('gulp-strip-debug');
//将less转换为css
var less = require('gulp-less');
//添加css前缀
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
//压缩css
var cleanCss = require('gulp-clean-css');
//压缩图片
var imageMin = require('gulp-imagemin');
//开启服务器
var connect= require('gulp-connect');
//环境变量
var devMod= process.env.NODE_ENV == 'development';
console.log(devMod)
var folder = {
    src: '/src',
    dist: '/dist'
}

gulp.task('html', function () {
    var page = gulp.src(folder.src + 'html/*')
    if(!devMod){
        page.pipe(htmlClean())
    }
        page.pipe(gulp.dest(folder.dist + '/html'))
        .pipe(connect.reload())
})

gulp.task('css', function () {
    var page = gulp.src(folder.src + 'css/*')
        .pipe(less())
        if(!devMod){
            page.pipe(postcss([autoprefixer()]))
                .pipe(cleanCss()) 
        }
        page.pipe(gulp.dest(folder.dist + '/css'))
            .pipe(connect.reload())

})

gulp.task('js', function () {
    var page = gulp.src(folder.src + 'js/*')
    if(!devMod){
        page.pipe(uglify())
        .pipe(stripDebug())
    }
        
        page.pipe(gulp.dest(folder.dist + '/js'))
        .pipe(connect.reload())

})

gulp.task('image', function () {
    gulp.src(folder.src + 'image/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + '/image'))
        .pipe(connect.reload())

})

gulp.task('server', function (){
    connect.server({
        port: '1111',
        liverload: true
    })
})

gulp.task('watch', function () {
    watch(folder.src + 'html/*', gulp.series('html'));
    watch(folder.src + 'css/*', gulp.series('css'));
    watch(folder.src + 'js/*', gulp.series('js'));
    watch(folder.src + 'image/*', gulp.series('image'));
})  

gulp.task('defaule', gulp.series(gulp.parallel('html', 'css', 'js', 'image', 'server')))