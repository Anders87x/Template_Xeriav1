"use strict";

const gulp = require("gulp"),
    newer = require("gulp-newer"),
    imagemin = require("gulp-imagemin"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    gutil = require("gulp-util"),
    lodash = require("lodash"),
    gulpSequence = require("gulp-sequence"),
    browsersync = require("browser-sync"),
    fileinclude = require('gulp-file-include');

const folder = {
    src: "src/", // source files
    dist: "dist/", // build files
    dist_assets: "dist/assets/" //build assets files
};

/*
Copy assets/vendors from their node_module package to scss & js folder
Read More: https://florian.ec/articles/frontend-dependencies-npm/
*/

gulp.task("copy-assets", function () {
    var assets = {
        js: [
            "./node_modules/jquery/dist/jquery.js",
            "./node_modules/bootstrap/dist/js/bootstrap.bundle.js",
            "./node_modules/metismenu/dist/metisMenu.js",
            "./node_modules/jquery-slimscroll/jquery.slimscroll.js",
            "./node_modules/node-waves/dist/waves.js",
            "./node_modules/waypoints/lib/jquery.waypoints.min.js",
            "./node_modules/jquery.counterup/jquery.counterup.min.js"
        ],
        scss: [],
    };

    var third_party_assets = {
        css_js: [
            {"name": "apexcharts", "assets": ["./node_modules/apexcharts/dist/apexcharts.min.js"]},
            {"name": "select2", "assets": ["./node_modules/select2/dist/js/select2.min.js", "./node_modules/select2/dist/css/select2.min.css"]},
            {"name": "jquery-nice-select", "assets": ["./node_modules/jquery-nice-select/js/jquery.nice-select.min.js", "./node_modules/jquery-nice-select/css/nice-select.css"]},
            {"name": "jquery-mask-plugin", "assets": ["./node_modules/jquery-mask-plugin/dist/jquery.mask.min.js"]},
            {"name": "chart-js", "assets": ["./node_modules/chart.js/dist/Chart.bundle.min.js"]},
            {
                "name": "datatables", "assets": ["./node_modules/datatables.net/js/jquery.dataTables.min.js",
                    "./node_modules/datatables.net-bs4/js/dataTables.bootstrap4.js",
                    "./node_modules/datatables.net-responsive/js/dataTables.responsive.min.js",
                    "./node_modules/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js",
                    "./node_modules/datatables.net-buttons/js/dataTables.buttons.min.js",
                    "./node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js",
                    "./node_modules/datatables.net-buttons/js/buttons.html5.min.js",
                    "./node_modules/datatables.net-buttons/js/buttons.flash.min.js",
                    "./node_modules/datatables.net-buttons/js/buttons.print.min.js",
                    "./node_modules/datatables.net-keytable/js/dataTables.keyTable.min.js",
                    "./node_modules/datatables.net-select/js/dataTables.select.min.js",
                    "./node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css",
                    "./node_modules/datatables.net-responsive-bs4/css/responsive.bootstrap4.css",
                    "./node_modules/datatables.net-buttons-bs4/css/buttons.bootstrap4.css",
                    "./node_modules/datatables.net-select-bs4/css/select.bootstrap4.css"]
            },
            {"name": "pdfmake", "assets": ["./node_modules/pdfmake/build/pdfmake.min.js", "./node_modules/pdfmake/build/vfs_fonts.js"]},
            {"name": "daterangepicker", "assets": ["./node_modules/daterangepicker/daterangepicker.js","./node_modules/daterangepicker/daterangepicker.css"]},
            {"name": "jquery-ui", "assets": ["./node_modules/jquery-ui/jquery-ui.min.js"]},
            {"name": "bootstrap-datepicker", "assets": ["./node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js","./node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css"]},
            {"name": "fullcalendar", "assets": ["./node_modules/fullcalendar/dist/fullcalendar.min.js", "./node_modules/fullcalendar/dist/fullcalendar.min.css"]},
            {"name": "gmaps", "assets": ["./node_modules/gmaps/gmaps.min.js"]},
            {
                "name": "jquery-vectormap", "assets": ["./node_modules/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.min.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-world-mill-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-us-merc-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-au-mill-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-us-il-chicago-mill-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-in-mill-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-uk-mill-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-ca-lcc-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.css"]
            },
            { "name": "ion-rangeslider", "assets": ["./node_modules/ion-rangeslider/js/ion.rangeSlider.min.js", "./node_modules/ion-rangeslider/css/ion.rangeSlider.min.css"] },
            {"name": "toastr", "assets": ["./node_modules/toastr/build/toastr.min.js", "./node_modules/toastr/build/toastr.min.css"]},
            {"name": "sweetalert2", "assets": ["./node_modules/sweetalert2/dist/sweetalert2.min.js", "./node_modules/sweetalert2/dist/sweetalert2.min.css"]},
            {"name": "switchery", "assets": ["./node_modules/mohithg-switchery/dist/switchery.min.js", "./node_modules/mohithg-switchery/dist/switchery.min.css"]},
            {"name": "bootstrap-maxlength", "assets": ["./node_modules/bootstrap-maxlength/bootstrap-maxlength.min.js"]},
            {"name": "jquery-sparkline", "assets": ["./node_modules/jquery-sparkline/jquery.sparkline.min.js"]},
            {"name": "jquery-knob", "assets": ["./node_modules/jquery-knob/dist/jquery.knob.min.js"]},
            {"name": "moment", "assets": ["./node_modules/moment/min/moment.min.js"]},
            {"name": "custombox", "assets": ["./node_modules/custombox/dist/custombox.min.js", "./node_modules/custombox/dist/custombox.min.css"]},
            {"name": "jquery-toast", "assets": ["./node_modules/jquery-toast-plugin/dist/jquery.toast.min.js", "./node_modules/jquery-toast-plugin/dist/jquery.toast.min.css"]},
            {"name": "jquery-scrollto", "assets": ["./node_modules/jquery.scrollto/jquery.scrollTo.min.js"]},
            {"name": "peity", "assets": ["./node_modules/peity/jquery.peity.min.js"]},
            {"name": "nestable2", "assets": ["./node_modules/nestable2/dist/jquery.nestable.min.js", "./node_modules/nestable2/dist/jquery.nestable.min.css"]},
            {"name": "hopscotch", "assets": ["./node_modules/hopscotch/dist/js/hopscotch.min.js", "./node_modules/hopscotch/dist/css/hopscotch.min.css"]},
            {
                "name": "flot-charts", "assets": ["./node_modules/flot-charts/jquery.flot.js",
                    "./node_modules/flot-charts/jquery.flot.time.js",
                    "./node_modules/flot-charts/jquery.flot.resize.js",
                    "./node_modules/flot-charts/jquery.flot.pie.js",
                    "./node_modules/flot-charts/jquery.flot.selection.js",
                    "./node_modules/flot-charts/jquery.flot.stack.js",
                    "./node_modules/flot-charts/jquery.flot.crosshair.js",
                    "./node_modules/jquery.flot.tooltip/js/jquery.flot.tooltip.min.js",
                    "./node_modules/flot-orderbars/js/jquery.flot.orderBars.js"]
            },
            {"name": "raphael", "assets": ["./node_modules/raphael/raphael.min.js"]},
            {"name": "morris-js", "assets": ["./node_modules/morris.js/morris.min.js"]},
            {"name": "britecharts", "assets": ["./node_modules/britecharts/dist/bundled/britecharts.min.js","./node_modules/britecharts/dist/css/britecharts.min.css"]},
            { "name": "chartist", "assets": ["./node_modules/chartist/dist/chartist.min.js", "./node_modules/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.min.js", "./node_modules/chartist/dist/chartist.min.css"] },
            {"name": "c3", "assets": ["./node_modules/c3/c3.min.js", "./node_modules/c3/c3.min.css"]},
            {"name": "d3", "assets": ["./node_modules/d3/dist/d3.min.js"]},
            {"name": "jquery-tabledit", "assets": ["./node_modules/jquery-tabledit/jquery.tabledit.min.js"]},
            {"name": "rwd-table", "assets": ["./node_modules/RWD-Table-Patterns/dist/js/rwd-table.min.js", "./node_modules/RWD-Table-Patterns/dist/css/rwd-table.min.css"]},
            {"name": "tablesaw", "assets": ["./node_modules/tablesaw/dist/tablesaw.js", "./node_modules/tablesaw/dist/tablesaw.css"]},
            {"name": "magnific-popup", "assets": ["./node_modules/magnific-popup/dist/jquery.magnific-popup.min.js", "./node_modules/magnific-popup/dist/magnific-popup.css"]},
            {"name": "bootstrap-select", "assets": ["./node_modules/bootstrap-select/dist/js/bootstrap-select.min.js", "./node_modules/bootstrap-select/dist/css/bootstrap-select.min.css"]},
            { "name": "bootstrap-touchspin", "assets": ["./node_modules/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js", "./node_modules/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.css"] },
            {"name": "autocomplete", "assets": ["./node_modules/devbridge-autocomplete/dist/jquery.autocomplete.min.js"]},
            {"name": "parsleyjs", "assets": ["./node_modules/parsleyjs/dist/parsley.min.js"]},
            {"name": "bootstrap-colorpicker", "assets": ["./node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js", "./node_modules/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css"]},
            {"name": "clockpicker", "assets": ["./node_modules/clockpicker/dist/bootstrap-clockpicker.min.js", "./node_modules/clockpicker/dist/bootstrap-clockpicker.min.css"]},
            {"name": "twitter-bootstrap-wizard", "assets": ["./node_modules/twitter-bootstrap-wizard/jquery.bootstrap.wizard.min.js"]},
            {"name": "autonumeric", "assets": ["./node_modules/autonumeric/autoNumeric-min.js"]},
            {"name": "summernote", "assets": ["./node_modules/summernote/dist/summernote-bs4.min.js", "./node_modules/summernote/dist/summernote-bs4.css"]},
            {
                "name": "quill", "assets": ["./node_modules/quill/dist/quill.min.js", "./node_modules/quill/dist/quill.core.css",
                    "./node_modules/quill/dist/quill.bubble.css",
                    "./node_modules/quill/dist/quill.snow.css"]
            },
            {"name": "katex", "assets": ["./node_modules/katex/dist/katex.min.js"]},
            {"name": "dropzone", "assets": ["./node_modules/dropzone/dist/min/dropzone.min.js", "./node_modules/dropzone/dist/min/dropzone.min.css"]},
            {
                "name": "jquery-mapael", "assets": ["./node_modules/jquery-mapael/js/jquery.mapael.min.js",
                    "./node_modules/jquery-mapael/js/maps/world_countries.min.js",
                    "./node_modules/jquery-mapael/js/maps/usa_states.min.js"]
            },
            {"name": "jquery-countdown", "assets": ["./node_modules/jquery-countdown/dist/jquery.countdown.min.js"]},
            {"name": "treeview", "assets": ["./node_modules/jstree/dist/jstree.min.js","./node_modules/jstree/dist/themes/default/style.css"]}
        ]
    };

    //copying third party assets
    lodash(third_party_assets).forEach(function (assets, type) {
        if (type == "css_js") {
            lodash(assets).forEach(function (plugin) {
                var name = plugin['name'];
                var assetlist = plugin['assets'];
                lodash(assetlist).forEach(function (asset) {
                    gulp.src(asset).pipe(gulp.dest(folder.dist_assets + "libs/" + name));
                });
            });
            //gulp.src(assets).pipe(gulp.dest(folder.dist_assets + "css/vendor"));
        }
    });

    //copying required assets
    lodash(assets).forEach(function (assets, type) {
        if (type == "scss") {
            gulp
                .src(assets)
                .pipe(
                    rename({
                        // rename aaa.css to _aaa.scss
                        prefix: "_",
                        extname: ".scss"
                    })
                )
                .pipe(gulp.dest(folder.src + "scss/vendor"));
        } else {
            gulp.src(assets).pipe(gulp.dest(folder.src + "js/vendor"));
        }
    });

    //copying data files
    gulp.src(folder.src + "data/**").pipe(gulp.dest(folder.dist_assets + "/data"));
    
});

// image processing
gulp.task("imageMin", function () {
    var out = folder.dist_assets + "images";
    return gulp
        .src(folder.src + "images/**/*")
        .pipe(newer(out))
        .pipe(imagemin())
        .pipe(gulp.dest(out));
});

// copy fonts
// copy fonts from src folder to dist folder
gulp.task("fonts", function () {
    var out = folder.dist_assets + "fonts/";

    return gulp.src([folder.src + "fonts/**/*"]).pipe(gulp.dest(out));
});

// copy html
// copy html files from src folder to dist folder, also copy favicons
gulp.task("html", function () {
    var out = folder.dist;

    return gulp
        .src([
            folder.src + "html/*.html",
            folder.src + "html/*.ico", // favicons
            folder.src + "html/*.png"
        ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(gulp.dest(out));
});

// compile & minify sass
gulp.task("css", function () {
    gulp
	.src([folder.src + "/scss/bootstrap.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(cleanCSS())
        .pipe(
            rename({
                // rename app.css to icons.min.css
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./")) // source maps for icons.min.css
        .pipe(gulp.dest(folder.dist_assets + "css/"));
    gulp
        .src([folder.src + "/scss/icons.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(cleanCSS())
        .pipe(
            rename({
                // rename app.css to icons.min.css
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./")) // source maps for icons.min.css
        .pipe(gulp.dest(folder.dist_assets + "css/"));
    gulp
        .src([folder.src + "/scss/app-rtl.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(cleanCSS())
        .pipe(
            rename({
                // rename app.css to app.min.css
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./")) // source maps for app.min.css
        .pipe(gulp.dest(folder.dist_assets + "css/"));

    return gulp
        .src([folder.src + "/scss/app.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(cleanCSS())
        .pipe(
            rename({
                // rename app.css to app.min.css
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./")) // source maps for app.min.css
        .pipe(gulp.dest(folder.dist_assets + "css/"));
});

// js
gulp.task("javascript", function () {
    var out = folder.dist_assets + "js/";

    //copying demo pages related assets
    var app_pages_assets = {
        js: [
            folder.src + "js/pages/dashboard-1.init.js",
            folder.src + "js/pages/dashboard-2.init.js",
            folder.src + "js/pages/calendar.init.js",
            folder.src + "js/pages/apexcharts.init.js",
            folder.src + "js/pages/inbox.js",
            folder.src + "js/pages/datatables.init.js",
            folder.src + "js/pages/range-sliders.init.js",
            folder.src + "js/pages/toastr.init.js",
            folder.src + "js/pages/sweet-alerts.init.js",
            folder.src + "js/pages/widgets.init.js",
            folder.src + "js/pages/nestable.init.js",
            folder.src + "js/pages/treeview.init.js",
            folder.src + "js/pages/tour.init.js",
            folder.src + "js/pages/chartjs.init.js",
            folder.src + "js/pages/sparkline.init.js",
            folder.src + "js/pages/flot.init.js",
            folder.src + "js/pages/morris.init.js",
            folder.src + "js/pages/peity.init.js",
            folder.src + "js/pages/chartist.init.js",
            folder.src + "js/pages/tabledit.init.js",
            folder.src + "js/pages/responsive-table.init.js",
            folder.src + "js/pages/tablesaw.init.js",
            folder.src + "js/pages/form-advanced.init.js",
            folder.src + "js/pages/form-validation.init.js",
            folder.src + "js/pages/form-pickers.init.js",
            folder.src + "js/pages/form-wizard.init.js",
            folder.src + "js/pages/form-masks.init.js",
            folder.src + "js/pages/form-summernote.init.js",
            folder.src + "js/pages/form-quilljs.init.js",
            folder.src + "js/pages/form-fileuploads.init.js",
            folder.src + "js/pages/google-maps.init.js",
            folder.src + "js/pages/vector-maps.init.js",
            folder.src + "js/pages/mapeal-maps.init.js",
            folder.src + "js/pages/coming-soon.init.js",
            folder.src + "js/pages/lightbox.init.js",
            folder.src + "js/pages/treeview.init.js",
            folder.src + "js/pages/britechart.init.js",
            folder.src + "js/pages/tickets.js",
        ]
    };

    lodash(app_pages_assets).forEach(function (assets, type) {
        gulp.src(assets)
        .pipe(uglify())
        .on("error", function (err) {
            gutil.log(gutil.colors.red("[Error]"), err.toString());
        })
        .pipe(gulp.dest(out + "pages"));
    });

    // It's important to keep files at this order
    // so that `app.min.js` can be executed properly
    gulp
        .src([
            folder.src + "js/vendor/jquery.js",
            folder.src + "js/vendor/bootstrap.bundle.js",
            folder.src + "js/vendor/jquery.slimscroll.js",
            folder.src + "js/vendor/metisMenu.js",
            folder.src + "js/vendor/waves.js",
            folder.src + "js/vendor/jquery.waypoints.min.js",
            folder.src + "js/vendor/jquery.counterup.min.js"
        ])
        .pipe(sourcemaps.init())
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest(out))
        .pipe(
            rename({
                // rename app.js to app.min.js
                suffix: ".min"
            })
        )
        .pipe(uglify())
        .on("error", function (err) {
            gutil.log(gutil.colors.red("[Error]"), err.toString());
        })
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(out));

    return gulp
        .src([
            folder.src + "js/app.js"
        ])
        .pipe(sourcemaps.init())
        .pipe(concat("app.js"))
        .pipe(gulp.dest(out))
        .pipe(
            rename({
                // rename app.js to app.min.js
                suffix: ".min"
            })
        )
        .pipe(uglify())
        .on("error", function (err) {
            gutil.log(gutil.colors.red("[Error]"), err.toString());
        })
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(out));
});

// live browser loading
gulp.task("browserSync", function () {
    browsersync.init({
        server: {
            baseDir: folder.dist
        }
    });
});

// watch all changes
gulp.task("watch", function () {
    gulp.watch(folder.src + "html/**", ["html", browsersync.reload]);
    gulp.watch(folder.src + "assets/images/**/*", [
        "imageMin",
        browsersync.reload
    ]);
    gulp.watch(folder.src + "assets/fonts/**/*", ["fonts", browsersync.reload]);
    gulp.watch(folder.src + "scss/**/*", ["css", browsersync.reload]);
    gulp.watch(folder.src + "js/**/*", ["javascript", browsersync.reload]);
});

// default task
gulp.task(
    "default",
    gulpSequence(
        "copy-assets",
        "html",
        "imageMin",
        "fonts",
        "css",
        "javascript",
        "browserSync",
        "watch"
    )
);

// build
gulp.task(
    "build",
    gulpSequence("copy-assets", "html", "imageMin", "fonts", "css", "javascript")
);