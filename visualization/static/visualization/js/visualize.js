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

        visualize.exportData(group.all(), visualize.config.x, visualize.config.y, 'piePlot');

        pieChart.width(visualize.width)
            .height(visualize.height)
            .dimension(dimension)
            .group(group)
            .innerRadius(0)
            .title(function(p) {

                return p.value;
            })
            .renderTitle(true);

        var svg = d3.select("svg");
        console.log(svg);
        svg.append("text")
            .attr("x", (visualize.width / 2))
            .attr("y", 50)
            .attr("id", 'Helo')
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Value vs Date Graph");

        console.log(svg);
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

        visualize.exportData(group.all(), visualize.config.x, visualize.config.y, 'barPlot');


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

        barChart.width(visualize.width)
            .height(visualize.height)
            .margins({top: 40, right: 50, bottom: 30, left: 60})
            .dimension(dimension)
            .group(group)
            .x(d3.scale.ordinal().domain(ordinalX))
            .xUnits(dc.units.ordinal) //Set or get the xUnits function
            .y(d3.scale.linear().domain(linearY)) //Get or set the y scale. y scale is typically automatically generated by the chart implementation.
            .brushOn(true)
            .elasticY(true) //Turn on/off elastic y axis
            .centerBar(true); //Whether the bar chart will render each bar centered around the data position on x axis


        dc.renderAll();

    },
    boxChart: function(selector) { //present in dc.js dev

        var chartSelector = selector+"-chart";
        $("#chart")
            .attr('class', chartSelector)
            .css({
                'height': '30em',
                'margin-top': ''
            });

        //Defining the x scale is mandatory
        var boxPlot = dc.boxPlot("."+chartSelector);


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

        visualize.exportData(group.all(), visualize.config.x, visualize.config.y, 'boxPlot');

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

        boxPlot.width(visualize.width)
            .height(visualize.height)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(dimension)
            .group(group)
            .x(d3.scale.ordinal().domain(ordinalX))
            .xUnits(dc.units.ordinal)
            .elasticY(true) //Turn on/off elastic y axis
            .elasticX(true);

        dc.renderAll();
    },
    histogram: function(selector) {
        var chartSelector = selector+"-chart";
        $("#chart")
            .attr('class', chartSelector)
            .css({
                'height': '30em',
                'margin-top': ''
            });

        //Defining the x scale is mandatory
        var histogram = dc.barChart("."+chartSelector);


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

        visualize.exportData(group.all(), visualize.config.x, visualize.config.y, 'histogram');

        var groupByValue = function(d) {
            return d.value;
        };
        var groupByKey = function(d) {
            return d.key;
        };

        var linearX = d3.extent(group.all(), groupByKey);
        var linearY = d3.extent(group.all(), groupByValue);

        histogram.width(visualize.width)
            .height(visualize.height)
            .margins({top: 10, right: 10, bottom: 20, left: 40})
            .dimension(dimension)
            .group(group)
            .x(d3.scale.linear().domain(linearX))
            .y(d3.scale.linear().domain(linearY)) //Get or set the y scale. y scale is typically automatically generated by the chart implementation.
            .brushOn(true)
            .elasticY(true) //Turn on/off elastic y axis
            .elasticX(true)//Turn on/off elastic x axis
            .centerBar(true) //Whether the bar chart will render each bar centered around the data position on x axis
            .xAxis().tickFormat(d3.format("d"));


        dc.renderAll();
    },
    lineChart: function(selector) { //Generates a line Chart
        var chartSelector = selector+"-chart";
        $("#chart")
            .attr('class', chartSelector)
            .css({
                'height': '30em',
                'margin-top': ''
            });

        //Defining the x scale is mandatory
        var lineChart = dc.lineChart("."+chartSelector);


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

        visualize.exportData(group.all(), visualize.config.x, visualize.config.y, 'linePlot');


        var groupByValue = function(d) {
            return d.value;
        };
        var groupByKey = function(d) {
            return d.key;
        };

        var linearX = d3.extent(group.all(), groupByKey);
        var linearY = d3.extent(group.all(), groupByValue);


        lineChart.width(visualize.width)
            .height(visualize.height)
            .margins({top: 10, right: 10, bottom: 20, left: 40})
            .dimension(dimension)
            .group(group)
            .x(d3.scale.linear().domain(linearX))
            .renderHorizontalGridLines(true)
            .brushOn(true)
            .elasticY(true) //Turn on/off elastic y axis
            .xAxis().tickFormat(d3.format("d"));


        dc.renderAll();
    },
    bubbleChart: function(selector) { //Generate a bubble chart

        //Still need to fix x axis and y axis


        var chartSelector = selector+"-chart";
        $("#chart")
            .attr('class', chartSelector)
            .css({
                'height': '30em',
                'margin-top': ''
            });

        //Defining the x scale is mandatory
        var bubbleChart = dc.bubbleChart("."+chartSelector);


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


        visualize.exportData(group.all(), visualize.config.x, visualize.config.y, 'scatter');

        var groupByValue = function(d) {
            return d.value;
        };
        var groupByKey = function(d) {
            return d.key;
        };

        var linearX = d3.extent(group.all(), groupByKey);
        var linearY = d3.extent(group.all(), groupByValue);


        console.log(linearX);
        console.log(linearY);

        bubbleChart.width(visualize.width)
                    .height(visualize.height)
                    .margins({top: 30, right: 50, bottom: 30, left: 60})
                    .dimension(dimension)
                    .group(group)
                    .colors(d3.scale.category10())
                    .keyAccessor(function (p) {
                        return parseInt(p.key);
                    })
                    .valueAccessor(function (p) {
                        return parseInt(p.value);
                    })
                    .radiusValueAccessor(function (p) {
                        return parseInt(p.value);
                    })
                    .x(d3.scale.linear().domain([2000,2010]))//Get or set the x scale.
                    .r(d3.scale.linear().domain(linearY))
                    .y(d3.scale.linear().domain(linearY)) //Get or set the y scale. y scale is typically automatically generated by the chart implementation.
                    .minRadiusWithLabel(15)
                    .elasticY(true)
                    .yAxisPadding(100)
                    .elasticX(true)
                    .xAxisPadding(200)
                    .maxBubbleRelativeSize(0.05)
                    .xAxis().tickFormat(d3.format("d"));

        dc.renderAll();
    },
    stackedChart: function(selector) { //Present in dc.js
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


        visualize.exportData(group.all(), visualize.config.x, visualize.config.y, 'stackedArea');



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

        barChart.width(visualize.width)
            .height(visualize.height)
            .margins({top: 10, right: 10, bottom: 20, left: 40})
            .dimension(dimension)
            .group(group)
            .x(d3.scale.ordinal().domain(ordinalX))
            .xUnits(dc.units.ordinal) //Set or get the xUnits function
            .y(d3.scale.linear().domain(linearY)) //Get or set the y scale. y scale is typically automatically generated by the chart implementation.
            .brushOn(true)
            .elasticY(true) //Turn on/off elastic y axis
            .centerBar(true); //Whether the bar chart will render each bar centered around the data position on x axis


        dc.renderAll();
    },
    exportData: function(data, xAxis, yAxis, type) {
        $.ajax({
                url: '/exportData/',
                type: 'POST',
                dataType: 'json',
                headers: {
                    'X-CSRFToken' : $.cookie('csrftoken')
                },
                data: {
                    data: JSON.stringify(data),
                    xAxis:  $.base64.encode(xAxis),
                    yAxis: $.base64.encode(yAxis),
                    type: $.base64.encode(type)
                },
                success: function(response) {
                    if (response.success !== 1) {
                        vex.dialog.alert('Unable to send export data. Try again');
                    }

                },
                error: function() {
                    console.log('Error');
                }
            })
                .done(function() {
                    console.log("success");
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });


    }

};





