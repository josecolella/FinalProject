/**
 * Created by josecolella on 09/06/2014.
 */
'use strict';

//Represents the encapsulation of the visualize module
var visualize = {
    width: 800,
    height: 400,
    inputData: null,
    config: {
        'x': null,
        'y': null
    },
    cf: null,
    pieChart : function(selector) {

        var chartSelector = selector+"-chart";
        $("#chart")
            .attr('class', chartSelector)
            .css({
                'height': '30em',
                'margin-top': ''
            });

        var pieChart = dc.pieChart("."+chartSelector);


        var dimension= visualize.cf.dimension(function(row) { return row[visualize.config.x];});

        var group;
        if (visualize.config.x !== visualize.config.y) {
            group = dimension.group().reduceSum(function(row) {
                return row[visualize.config.y];
            });
        } else {
            group = dimension.group().reduceCount(function(row) {
                return row[visualize.config.y];
            });
        }

        pieChart.width(visualize.width)
            .height(visualize.height)
            .dimension(dimension)
            .group(group)
            .innerRadius(0)
            .title(function(p) {

                return p.value;
            })
            .renderTitle(true);
        dc.renderAll();


    },
    barChart: function(selector) {
        var chartSelector = selector+"-chart";
        $("#chart")
            .attr('class', chartSelector)
            .css({
                'height': '30em',
                'margin-top': ''
            });

        //Defining the x scale is mandatory
        var barChart = dc.barChart("."+chartSelector);


        var dimension= visualize.cf.dimension(function(row) { return row[visualize.config.x];});

        var group;
        if (visualize.config.x !== visualize.config.y) {
            group = dimension.group().reduceSum(function(row) {
                return row[visualize.config.y];
            });
        } else {
            group = dimension.group().reduceCount(function(row) {
                return row[visualize.config.y];
            });
        }

        console.log('HELLO');
        console.log(group.all());
        var groupByValue = function(d) {
            return d.value;
        };
        var groupByKey = function(d) {
            return d.key;
        };

        var ordinalX = $.map(group.all(), function(item, index) {
            return item.key;
        });
        var linearY = d3.extent(group.all(), groupByValue);
        console.log(ordinalX);
        console.log(linearY);

        barChart.width(visualize.width)
            .height(visualize.height)
            .margins({top: 10, right: 10, bottom: 20, left: 40})
            .dimension(dimension)
            .group(group)
            .x(d3.scale.ordinal().domain(ordinalX))
            .xUnits(dc.units.ordinal)
            .y(d3.scale.linear().domain(linearY))
            .brushOn(false)
//            .renderHorizontalGridLines(true)
//            .renderVerticalGridLines(true)
            .centerBar(true);

        dc.renderAll();

    },
    boxChart: function(selector) {

    },
    curveChart: function(selector) {

    },
    histogram: function(selector) {

    },
    lineChart: function(selector) {

    },
    scatterChart: function(selector) {

    },
    stackedChart: function(selector) {

    }

};





