/*
Template Name: Xeria - Responsive Bootstrap 4 Admin Dashboard
Author: CoderThemes
Version: 1.0.0
Website: https://coderthemes.com/
Contact: support@coderthemes.com
File: Form advanced init js
*/

!function($) {
    "use strict";

    var FormAdvanced = function() {};

    //Select2
    FormAdvanced.prototype.initSelect2 = function() {
        // Select2
        $('[data-toggle="select2"]').select2();
    },

    //Max Length
    FormAdvanced.prototype.initMaxLength = function() {
        //Bootstrap-MaxLength
        $('input#defaultconfig').maxlength({
            warningClass: "badge badge-success",
            limitReachedClass: "badge badge-danger"
        });

        $('input#thresholdconfig').maxlength({
            threshold: 20,
            warningClass: "badge badge-success",
            limitReachedClass: "badge badge-danger"
        });

        $('input#alloptions').maxlength({
            alwaysShow: true,
            separator: ' out of ',
            preText: 'You typed ',
            postText: ' chars available.',
            validate: true,
            warningClass: "badge badge-success",
            limitReachedClass: "badge badge-danger"
        });

        $('textarea#textarea').maxlength({
            alwaysShow: true,
            warningClass: "badge badge-success",
            limitReachedClass: "badge badge-danger"
        });

        $('input#placement').maxlength({
            alwaysShow: true,
            placement: 'top-left',
            warningClass: "badge badge-success",
            limitReachedClass: "badge badge-danger"
        });
    },

    //initializing Custom Select
    FormAdvanced.prototype.initCustomSelect = function() {
        $('[data-plugin="customselect"]').niceSelect();
    },

    //initializing Switchery
    FormAdvanced.prototype.initSwitchery = function() {
        $('[data-plugin="switchery"]').each(function (idx, obj) {
            new Switchery($(this)[0], $(this).data());
        });
    },

    // touchspin
    FormAdvanced.prototype.initTouchspin = function() {
        var defaultOptions = {
        };

        // touchspin
        $('[data-toggle="touchspin"]').each(function (idx, obj) {
            var objOptions = $.extend({}, defaultOptions, $(obj).data());
            $(obj).TouchSpin(objOptions);
        });
    },

    //initilizing
    FormAdvanced.prototype.init = function() {
        var $this = this;
        this.initSelect2(),
        this.initMaxLength(),
        this.initCustomSelect(),
        this.initSwitchery(),
        this.initTouchspin();
    },

    $.FormAdvanced = new FormAdvanced, $.FormAdvanced.Constructor = FormAdvanced

}(window.jQuery),
    //initializing main application module
    function ($) {
        "use strict";
        $.FormAdvanced.init();
    }(window.jQuery);