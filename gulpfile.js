"use strict";

var gulp = require("gulp");
var babel = require("gulp-babel");
var rename = require("gulp-rename");

var staticFiles = ["index.html", "style.css"];
var vendorFiles = ["vendor/*"];
var distDir = "./dist/";

gulp.task("transpile", function() {
    return gulp.src("*.es6")
        .pipe(babel())
        .pipe(rename(function(file) {
            file.extname = ".js";
            return file;
        }))
        .pipe(gulp.dest(distDir));
});

gulp.task("copy-static", function() {
    return gulp.src(staticFiles)
        .pipe(gulp.dest(distDir));
});

gulp.task("copy-vendor", function() {
    return gulp.src(vendorFiles)
        .pipe(gulp.dest(distDir + "/vendor/"));
});

gulp.task("watch", function () {
    gulp.watch("*.es6", ["transpile"]);
    gulp.watch(staticFiles, ["copy-static"]);
});

gulp.task("default", ["transpile", "copy-static", "copy-vendor", "watch"]);
