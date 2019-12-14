/*
Template Name: Xeria - Responsive Bootstrap 4 Admin Dashboard
Author: CoderThemes
Version: 1.0.0
Website: https://coderthemes.com/
Contact: support@coderthemes.com
File: Form pickers init js
*/

!function ($) {
    "use strict";

    var FormPickers = function () { };

    FormPickers.prototype.init = function () {
        
        // Color Picker
        
        $('#basic-colorpicker').colorpicker();

        $('#hexa-colorpicker').colorpicker({
            format: 'auto'
        });

        $('#component-colorpicker').colorpicker({
            format: null
        });

        $('#horizontal-colorpicker').colorpicker({
            horizontal: true
        });

        $('#inline-colorpicker').colorpicker({
            color: '#DD0F20',
            inline: true,
            container: true
        });

        //Clock Picker
        $('.clockpicker').clockpicker({
            donetext: 'Done'
        });
        
        $('#single-input').clockpicker({
            placement: 'bottom',
            align: 'left',
            autoclose: true,
            'default': 'now'
        });
        $('#check-minutes').click(function(e){
            // Have to stop propagation here
            e.stopPropagation();
            $("#single-input").clockpicker('show')
                    .clockpicker('toggleView', 'minutes');
        });

        // Date Range Picker
        var defaultOptions = {
            "cancelClass": "btn-light",
            "applyButtonClasses": "btn-success"
        };

        // date pickers
        $('[data-toggle="date-picker"]').each(function (idx, obj) {
            var objOptions = $.extend({}, defaultOptions, $(obj).data());
            $(obj).daterangepicker(objOptions);
        });

        //date pickers ranges only
        var start = moment().subtract(29, 'days');
        var end = moment();
        var defaultRangeOptions = {
            startDate: start,
            endDate: end,
            ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        };

        $('[data-toggle="date-picker-range"]').each(function (idx, obj) {
            var objOptions = $.extend({}, defaultRangeOptions, $(obj).data());
            var target = objOptions["targetDisplay"];
            //rendering
            $(obj).daterangepicker(objOptions, function(start, end) {
                if (target)
                    $(target).html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            });
        });
        
    },
        $.FormPickers = new FormPickers, $.FormPickers.Constructor = FormPickers

}(window.jQuery),

    //initializing 
    function ($) {
        "use strict";
        $.FormPickers.init()
    }(window.jQuery);


