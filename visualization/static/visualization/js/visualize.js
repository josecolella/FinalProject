/**
 * Created by josecolella on 09/06/2014.
 */
'use strict';


var visualize = {
    width: 600,
    height: 300,
    pieChart : function(data, xAxis, yAxis) {

        $("#chart").attr('class', 'pie-chart');

        var pieChart = dc.pieChart(".pie-chart");

        var cf = crossfilter(data);

        var dimension = crossfilter.dimension(function(row) { return row[xAxis];});
        var group = dimension.group.reduceCount(function(row) { return row[yAxis];});

        pieChart.width(visualize.width)
                .height(visualize.height)
                .dimension(dimension)
                .group(group)
                .innerRadius(0);

        dc.renderAll();


    }

};








var pieChart = function() {

    function exampleData() {
        return  [
            {
                "label": "One",
                "value" : 29.765957771107
            } ,
            {
                "label": "Two",
                "value" : 0
            } ,
            {
                "label": "Three",
                "value" : 32.807804682612
            } ,
            {
                "label": "Four",
                "value" : 196.45946739256
            } ,
            {
                "label": "Five",
                "value" : 0.19434030906893
            } ,
            {
                "label": "Six",
                "value" : 98.079782601442
            } ,
            {
                "label": "Seven",
                "value" : 13.925743130903
            } ,
            {
                "label": "Eight",
                "value" : 5.1387322875705
            }
        ];
    }


    nv.addGraph(function() {
        var chart = nv.models.pieChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .showLabels(true);

        d3.select("#chart svg")
            .datum(exampleData())
            .transition()
            .duration(1200)
            .call(chart);

        return chart;
    });

};





var lineChart = function() {
  nv.addGraph(function() {
  var chart = nv.models.lineChart()
                .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                .transitionDuration(350)  //how fast do you want the lines to transition?
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis
  ;

  chart.xAxis     //Chart x-axis settings
      .axisLabel('Time (ms)')
      .tickFormat(d3.format(',r'));

  chart.yAxis     //Chart y-axis settings
      .axisLabel('Voltage (v)')
      .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos();   //You need data...

  d3.select('#chart svg')    //Select the <svg> element you want to render the chart in.
      .datum(myData)         //Populate the <svg> element with chart data...
      .call(chart);          //Finally, render the chart!

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
    cos.push({x: i, y: .5 * Math.cos(i/10)});
  }

  //Line chart data should be sent as an array of series objects.
  return [
    {
      values: sin,      //values - represents the array of {x,y} data points
      key: 'Sine Wave', //key  - the name of the series.
      color: '#ff7f0e'  //color - optional: choose your own line color.
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c'
    },
    {
      values: sin2,
      key: 'Another sine wave',
      color: '#7777ff',
      area: true      //area - set to true if you want this line to turn into a filled area chart.
    }
  ];
}

};
