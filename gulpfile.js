var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var clean = require("gulp-clean");
var uglify = require("gulp-uglify");
var cleanCss = require('gulp-clean-css');
var concat = require("gulp-concat");
var usemin = require("gulp-usemin");
var htmlmin = require('gulp-htmlmin');
var replace = require('gulp-replace');
var rename = require("gulp-rename");
var rev = require('gulp-rev');

gulp.task("default",['copy'],function(){
	gulp.start("build");
});

gulp.task("server",function(){
	
	// Start a Browsersync proxy
	browserSync.init({
		//copie a pasta para a raiz do seu servidor, ex:xampp/htdocs/  
		//ao renomear o projeto, trocar o proxy : "127.0.0.1/SEUPROJETO/src"
	    proxy: "127.0.0.1/boilerplate-bt3-jq3/src"
	});
	//informa suas pastas separadas, para o browersync, verifiquem que eventos separados são mais leves na memória
	gulp.watch("src/js/*.js").on("change",browserSync.reload);
	gulp.watch("src/css/*.css").on("change",browserSync.reload);
	gulp.watch("src/*.html").on("change",browserSync.reload);
});

gulp.task("clean",function(){
	return gulp.src("dist").pipe(clean());
});

gulp.task("copy",['clean'],function(){
	gulp.src("src/fonts/**/*").pipe(gulp.dest("dist/fonts/"));
	return;
});

gulp.task("build",function(){
	gulp.src('src/index.html')
	.pipe(usemin({
	css: [ rev ],
	html: [ function () {return htmlmin({ collapseWhitespace: true, removeComments: true});} ],
	jsAttributes : {async : true},
	js: [ uglify, rev ],
	inlinejs: [ uglify ],
	inlinecss: [ cleanCss, 'concat' ]
	}))
	.pipe(gulp.dest('dist/'));
});

