/*
Template Name: Xeria - Responsive Bootstrap 4 Admin Dashboard
Author: CoderThemes
Version: 1.0.0
Website: https://coderthemes.com/
Contact: support@coderthemes.com
File: Dashboard 2 init
*/

$( document ).ready(function() {
    // Default Datatable
	$('#datatable').DataTable({
		"language": {
				"paginate": {
						"previous": "<i class='mdi mdi-chevron-left'>",
						"next": "<i class='mdi mdi-chevron-right'>"
				}
		},
		"drawCallback": function () {
				$('.dataTables_paginate > .pagination').addClass('pagination-rounded');
		},
		"pageLength": 4,
		"searching": false,
		"lengthChange": false
    });
    
    // Sales Analytics Chart

    var options = {
        chart: {
            height: 380,
            type: 'line',
            padding: {
                right: 0,
                left: 0
            },
            stacked: false,
            toolbar: {
                show: false
            }
        },
        stroke: {
            width: [0, 2, 4],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                columnWidth: '50%'
            }
        },
        colors: ["#23b397", "#f8cc6b", "#f0643b"],
        series: [{
            name: 'Desktops',
            type: 'column',
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        }, {
            name: 'Tablets',
            type: 'area',
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
        }, {
            name: 'Mobiles',
            type: 'line',
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
        }],
        fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
            }
        },
        labels: ['01/01/2018', '02/01/2018', '03/01/2018', '04/01/2018', '05/01/2018', '06/01/2018', '07/01/2018', '08/01/2018', '09/01/2018', '10/01/2018', '11/01/2018'],
        markers: {
            size: 0
        },
        legend: {
            offsetY: -10,
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            labels: {
                show: true,
            },
            title: {
                text: "Sales Analytics",
                offsetX: -10,
                offsetY: 0,
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " Sales";
                    }
                    return y;
    
                }
            }
        },
        grid: {
            borderColor: '#f1f3fa',
        }
    }
    
    var chart = new ApexCharts(
        document.querySelector("#apex-sales-analytics"),
        options
    );
    
    chart.render();
    

    // Order Analytics

    function generateData(baseval, count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;
    
            series.push([x, y, z]);
            baseval += 86400000;
            i++;
        }
        return series;
    }
    
    
    var options = {
        chart: {
            height: 380,
            type: 'bubble',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        series: [{
                name: 'Direct',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Affilliate',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Sponsored',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            }
        ],
        fill: {
            opacity: 0.8,
            gradient: {
                enabled: false
            }
        },
        colors: ["#56c2d6", "#f0643b", "#bbc46a"],
        xaxis: {
            tickAmount: 12,
            type: 'category',
        },
        yaxis: {
            max: 70,
            labels: {
                show: true,
                offsetX: -20,
                offsetY: 0,
            },
        },
        grid: {
            borderColor: '#f1f3fa',
            right: 0,
            left: 0
        },
        legend: {
            offsetY: -10,
        }
    }
    
    var chart = new ApexCharts(
        document.querySelector("#apex-order-analytics"),
        options
    );
    
    chart.render();
});