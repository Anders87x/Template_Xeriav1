/*
Template Name: Xeria - Responsive Bootstrap 4 Admin Dashboard
Author: CoderThemes
Version: 1.0.0
Website: https://coderthemes.com/
Contact: support@coderthemes.com
File: Responsive table init js
*/

!function($) {
    "use strict";

    var ResponsiveTable = function() {};

    ResponsiveTable.prototype.init = function () {
        $('.table-rep-plugin').responsiveTable('update');
    },
    $.ResponsiveTable = new ResponsiveTable, $.ResponsiveTable.Constructor = ResponsiveTable

}(window.jQuery),

//initializing 
function($) {
    "use strict";
    $.ResponsiveTable.init()
}(window.jQuery);