/*
Template Name: Xeria - Responsive Bootstrap 4 Admin Dashboard
Author: CoderThemes
Version: 1.0.0
Website: https://coderthemes.com/
Contact: support@coderthemes.com
File: Brite Charts
*/

var briteChartApp = window.briteChartApp || {};

(function ($, context) {
    "use strict";
  /**
   * Creates the bar chart
   */
  context.createBarChart = function (elementSelector, data) {
    var chartTooltip = new britecharts.miniTooltip();
    var _barChart = new britecharts.bar();
    var barContainer = d3.select(elementSelector),
      containerWidth = barContainer.node()
        ? barContainer.node().getBoundingClientRect().width
        : false,
      containerHeight = barContainer.node()
        ? barContainer.node().getBoundingClientRect().height
        : false,
      tooltipContainer = void 0;

    var margin = {
      top: 10,
      left: 55,
      bottom: 20,
      right: 10
    };

    _barChart
      .isAnimated(true)
      .width(containerWidth)
      .height(containerHeight)
      .margin(margin)
      .betweenBarsPadding(0.5)
      .colorSchema(["#56c2d6"])
      .on("customMouseOver", chartTooltip.show)
      .on("customMouseMove", chartTooltip.update)
      .on("customMouseOut", chartTooltip.hide);

    barContainer.datum(data).call(_barChart);
    tooltipContainer = d3.select(elementSelector + " .metadata-group");
    tooltipContainer.datum([]).call(chartTooltip);
  };

  /**
   * Creates the horizontal bar chart
   */
  context.createHorizontalBarChart = function (elementSelector, data) {
    var _barChart = new britecharts.bar();

    var barContainer = d3.select(elementSelector),
      containerWidth = barContainer.node()
        ? barContainer.node().getBoundingClientRect().width
        : false,
      containerHeight = barContainer.node()
        ? barContainer.node().getBoundingClientRect().height
        : false,
      tooltipContainer = void 0;

    var margin = {
      top: 10,
      left: 50,
      bottom: 20,
      right: 10
    };

    _barChart
      .colorSchema(['#4a81d4','#f672a7','#e3eaef','#f0643b','#56c2d6', "#675db7", "#f8cc6b"])
      .isAnimated(true)
      .isHorizontal(true)
      .width(containerWidth)
      .margin(margin)
      .enableLabels(true)
      .percentageAxisToMaxRatio(1.3)
      .labelsNumberFormat(1)
      .height(containerHeight);

    barContainer.datum(data).call(_barChart);
  };

  /**
   * creates the line chart
   * @param {*} elementSelector
   * @param {*} data
   */
  context.createLineChart = function (elementSelector, data) {
    var lineChart = new britecharts.line(),
      chartTooltip = new britecharts.tooltip(),
      lineContainer = d3.select(elementSelector),
      containerWidth = lineContainer.node()
        ? lineContainer.node().getBoundingClientRect().width
        : false,
      tooltipContainer = void 0;

    lineChart
      .isAnimated(true)
      .aspectRatio(0.7)
      .tooltipThreshold(100)
      .grid("horizontal")
      .width(containerWidth)
      .dateLabel("date")
      .valueLabel("value")
      .on("customMouseOver", chartTooltip.show)
      .on("customMouseMove", chartTooltip.update)
      .on("customMouseOut", chartTooltip.hide);

    chartTooltip.title("Sample Data");

    //   .topicsOrder(lineData2.dataByTopic.map(function(topic) {
    //   return topic.topic;
    // }));

    lineContainer.datum(data).call(lineChart);
    tooltipContainer = d3.select(
      elementSelector + " .metadata-group .hover-marker"
    );
    tooltipContainer.datum([]).call(chartTooltip);
  };

  /**
   * Creates the donut chart
   * @param {*} elementSelector
   * @param {*} data
   */
  context.createDonutChart = function (elementSelector, data) {
    var donutChart = britecharts.donut(),
      legendChart = britecharts.legend(),
      legendContainer = void 0;

    legendChart
      .width(250)
      .height(200)
      .colorSchema(['#4a81d4','#f672a7','#e3eaef','#f0643b','#56c2d6', "#f8cc6b"])
      .numberFormat("s");

    donutChart.height(300)
      .highlightSliceById(3)
      .colorSchema(['#4a81d4','#f672a7','#e3eaef','#f0643b','#56c2d6', "#f8cc6b"])
      .hasFixedHighlightedSlice(true)
      .internalRadius(80)
      .on('customMouseOver', function (data) {
        legendChart.highlight(data.data.id);
      })
      .on('customMouseOut', function () {
        legendChart.clearHighlight();
      });

    d3.select(elementSelector)
      .datum(data)
      .call(donutChart);
    legendContainer = d3.select(".legend-chart-container");
    legendContainer.datum(data).call(legendChart);
  };

  /**
   * creates brush chart
   * @param {*} elementSelector
   * @param {*} data
   */
  context.createBrushChart = function (elementSelector, data) {
    var brushContainer = d3.select(elementSelector);
    var brushChart = britecharts.brush(),
      containerWidth = brushContainer.node()
        ? brushContainer.node().getBoundingClientRect().width
        : false;

    brushChart
      .height(320)
      .width(containerWidth)
      .on("customBrushStart", function (brushExtent) {
        var format = d3.timeFormat("%m/%d/%Y");
        console.log("Start date = " + format(brushExtent[0]));
        console.log("End date = " + format(brushExtent[1]));
      })
      .on("customBrushEnd", function (brushExtent) {
        console.log("rounded extent", brushExtent);
      });

    brushContainer.datum(data).call(brushChart);

    brushChart.dateRange(["9/15/2015", "1/25/2016"]);
  };

  /**
   * Creates step chart
   * @param {*} elementSelector
   * @param {*} data
   */
  context.createStepChart = function (elementSelector, data) {
    var stepChart = britecharts.step(),
      chartTooltip = britecharts.miniTooltip(),
      stepContainer = d3.select(elementSelector),
      containerWidth = stepContainer.node()
        ? stepContainer.node().getBoundingClientRect().width
        : false,
      tooltipContainer = void 0;

    stepChart
      .width(containerWidth)
      .height(320)
      .margin({
        top: 40,
        right: 40,
        bottom: 80,
        left: 50
      })
      .on("customMouseOver", chartTooltip.show)
      .on("customMouseMove", chartTooltip.update)
      .on("customMouseOut", chartTooltip.hide);

    stepContainer.datum(data).call(stepChart);

    chartTooltip.nameLabel("key");

    tooltipContainer = d3.select(
      elementSelector + " .step-chart .metadata-group"
    );
    tooltipContainer.datum([]).call(chartTooltip);
  };

  //private method
  function init() {
    var barData = [
      { name: "Mon", value: 2100 },
      { name: "Tue", value: 5000 },
      { name: "Wed", value: 4000 },
      { name: "Thu", value: 5500 },
      { name: "Fri", value: 6500 },
      { name: "Sat", value: 4500 },
      { name: "Sun", value: 3500 }
    ];

    var lineData = {
      dataByTopic: [
        {
          topic: 103,
          topicName: "San Francisco",
          dates: [
            {
              date: "2018-06-27T07:00:00.000Z",
              value: 1,
              fullDate: "2018-06-27T07:00:00.000Z"
            },
            {
              date: "2018-06-28T07:00:00.000Z",
              value: 1,
              fullDate: "2018-06-28T07:00:00.000Z"
            },
            {
              date: "2018-06-29T07:00:00.000Z",
              value: 4,
              fullDate: "2018-06-29T07:00:00.000Z"
            },
            {
              date: "2018-06-30T07:00:00.000Z",
              value: 2,
              fullDate: "2018-06-30T07:00:00.000Z"
            },
            {
              date: "2018-07-01T07:00:00.000Z",
              value: 3,
              fullDate: "2018-07-01T07:00:00.000Z"
            },
            {
              date: "2018-07-02T07:00:00.000Z",
              value: 3,
              fullDate: "2018-07-02T07:00:00.000Z"
            },
            {
              date: "2018-07-03T07:00:00.000Z",
              value: 0,
              fullDate: "2018-07-03T07:00:00.000Z"
            },
            {
              date: "2018-07-04T07:00:00.000Z",
              value: 3,
              fullDate: "2018-07-04T07:00:00.000Z"
            },
            {
              date: "2018-07-05T07:00:00.000",
              value: 1,
              fullDate: "2018-07-05T07:00:00.000Z"
            },
            {
              date: "2018-07-06T07:00:00.000Z",
              value: 2,
              fullDate: "2018-07-06T07:00:00.000Z"
            },
            {
              date: "2018-07-07T07:00:00.000Z",
              value: 0,
              fullDate: "2018-07-07T07:00:00.000Z"
            },
            {
              date: "2018-07-08T07:00:00.000Z",
              value: 2,
              fullDate: "2018-07-08T07:00:00.000Z"
            },
            {
              date: "2018-07-09T07:00:00.000Z",
              value: 1,
              fullDate: "2018-07-09T07:00:00.000Z"
            },
            {
              date: "2018-07-10T07:00:00.000Z",
              value: 4,
              fullDate: "2018-07-10T07:00:00.000Z"
            },
            {
              date: "2018-07-11T07:00:00.000Z",
              value: 2,
              fullDate: "2018-07-11T07:00:00.000Z"
            },
            {
              date: "2018-07-12T07:00:00.000Z",
              value: 1,
              fullDate: "2018-07-12T07:00:00.000Z"
            },
            {
              date: "2018-07-13T07:00:00.000Z",
              value: 6,
              fullDate: "2018-07-13T07:00:00.000Z"
            },
            {
              date: "2018-07-14T07:00:00.000Z",
              value: 5,
              fullDate: "2018-07-14T07:00:00.000Z"
            },
            {
              date: "2018-07-15T07:00:00.000Z",
              value: 2,
              fullDate: "2018-07-15T07:00:00.000Z"
            }
          ]
        }
      ]
    };

    var donutData = [
      { name: "Shiny", id: 1, quantity: 86, percentage: 5 },
      { name: "Blazing", id: 2, quantity: 300, percentage: 18 },
      { name: "Dazzling", id: 3, quantity: 276, percentage: 16 },
      { name: "Radiant", id: 4, quantity: 195, percentage: 11 },
      { name: "Sparkling", id: 5, quantity: 36, percentage: 2 },
      { name: "Other", id: 0, quantity: 814, percentage: 48 }
    ];

    var brushData = [
      { date: "2018-06-27T07:00:00.000Z", value: 4 },
      { date: "2018-06-28T07:00:00.000Z", value: 12 },
      { date: "2018-06-29T07:00:00.000Z", value: 33 },
      { date: "2018-06-30T07:00:00.000Z", value: 17 },
      { date: "2018-07-01T07:00:00.000Z", value: 17 },
      { date: "2018-07-02T07:00:00.000Z", value: 16 },
      { date: "2018-07-03T07:00:00.000Z", value: 8 },
      { date: "2018-07-04T07:00:00.000Z", value: 14 },
      { date: "2018-07-05T07:00:00.000Z", value: 11 },
      { date: "2018-07-06T07:00:00.000Z", value: 14 },
      { date: "2018-07-07T07:00:00.000Z", value: 25 },
      { date: "2018-07-08T07:00:00.000Z", value: 55 },
      { date: "2018-07-09T07:00:00.000Z", value: 15 },
      { date: "2018-07-10T07:00:00.000Z", value: 26 },
      { date: "2018-07-11T07:00:00.000Z", value: 21 },
      { date: "2018-07-12T07:00:00.000Z", value: 16 },
      { date: "2018-07-13T07:00:00.000Z", value: 20 },
      { date: "2018-07-14T07:00:00.000Z", value: 26 },
      { date: "2018-07-15T07:00:00.000Z", value: 24 },
      { date: "2018-07-16T07:00:00.000Z", value: 29 },
      { date: "2018-07-17T07:00:00.000Z", value: 12 },
      { date: "2018-07-18T07:00:00.000Z", value: 16 },
      { date: "2018-07-19T07:00:00.000Z", value: 11 },
      { date: "2018-07-20T07:00:00.000Z", value: 29 },
      { date: "2018-07-21T07:00:00.000Z", value: 9 },
      { date: "2018-07-22T07:00:00.000Z", value: 26 },
      { date: "2018-07-23T07:00:00.000Z", value: 21 },
      { date: "2018-07-24T07:00:00.000Z", value: 18 },
      { date: "2018-07-25T07:00:00.000Z", value: 15 },
      { date: "2018-07-26T07:00:00.000Z", value: 23 },
      { date: "2018-07-27T07:00:00.000Z", value: 43 },
      { date: "2018-07-28T07:00:00.000Z", value: 44 },
      { date: "2018-07-29T07:00:00.000Z", value: 67 },
      { date: "2018-07-30T07:00:00.000Z", value: 67 },
      { date: "2018-07-31T07:00:00.000Z", value: 0 },
      { date: "2018-08-01T07:00:00.000Z", value: 0 },
      { date: "2018-08-02T07:00:00.000Z", value: 0 }
    ];

    var stepData = [
      { key: "Appetizer", value: 400 },
      { key: "Soup", value: 300 },
      { key: "Salad", value: 300 },
      { key: "Lunch", value: 250 },
      { key: "Dinner", value: 220 },
      { key: "Dessert", value: 100 },
      { key: "Midnight snack", value: 20 }
    ];


    function drawCharts() {
      d3.selectAll('.bar-chart').remove();
      d3.selectAll('.line-chart').remove();
      d3.selectAll('.donut-chart').remove();
      d3.selectAll('.britechart-legend').remove();
      d3.selectAll('.brush-chart').remove();
      d3.selectAll('.step-chart').remove();

      if ($(".bar-container").length > 0) {
        briteChartApp.createBarChart(".bar-container", barData);
      }

      if ($(".bar-container-horizontal").length > 0) {
        briteChartApp.createHorizontalBarChart(
          ".bar-container-horizontal",
          barData
        );
      }

      if ($(".line-container").length > 0) {
        briteChartApp.createLineChart(".line-container", lineData);
      }

      if ($(".donut-container").length > 0) {
        briteChartApp.createDonutChart(".donut-container", donutData);
      }

      if ($(".brush-container").length > 0) {
        briteChartApp.createBrushChart(".brush-container", brushData);
      }

      if ($(".step-container").length > 0) {
        briteChartApp.createStepChart(".step-container", stepData);
      }
    }

    // responsive charts
    $(window).on('resize', function (e) {
      e.preventDefault();
      setTimeout(drawCharts, 200);
    });

    //render charts
    drawCharts();
  }

  // The init will run in the document ready
  $(init);
})(jQuery, briteChartApp);