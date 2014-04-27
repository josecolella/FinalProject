'use strict';

var i = 0;
var rightStateClass = "glyphicon-chevron-right";
var downStateClass = 'glyphicon-chevron-down';
/**
 * Function created to manage the change of icons when a user clicks to see
 * the visualization model. Uses $(this) to make sure that only one caret moves
 * since the carets use the same clas
 */
var changeTitleCaretAction = function() {

    $(".titles").click(function(){
        //The element that is being clicked
        var element = $(this);
        var caret = element.find('span');
        var classes = caret.attr('class').split(" ");
        var inArray = jQuery.inArray(rightStateClass, classes);

        if (inArray != -1) {
            caret
                .addClass(downStateClass)
                .removeClass(rightStateClass);
        } else {
            caret
                .addClass(rightStateClass)
                .removeClass(downStateClass);
        }
    });
};

/**
 * Function that handles the fading out of the import panel
 */
var manageImportClose = function() {
    var dropzone = $("#dropzone");
    if (dropzone.is(":visible")) {
        hideImportPanelButtons();
        dropzone.fadeOut("fast");
        $("#import-info").remove();
    }
};

/**
 * Function that manages the opening of the import panel
 */
var manageImportOpen = function() {

    $("#import").click(function() {

        hideVisualizationModel();
        hideEditor();
        hideDataGrid();
        hideImportPanelButtons();

        var dropzone = $("#dropzone");
        if (dropzone.is(":visible")) {
            dropzone.fadeOut("slow");
            $("#import-info").remove();
            hideImportPanelButtons();

        } else {
            dropzone.fadeIn("slow");
            dropzone.prepend("<div class='alert alert-info fade in' id='import-info'><button type='button' class='close data-dismiss='alert' aria-hidden='true' onclick='closeAlert();'>×</button><strong>Drop</strong> or <strong>Click</strong> on the panel below to import your data sets</div>");

        }

    });

};

/**
 * Function that shows the available options for the import panel
 */
var showImportPanelButtons = function() {
    $("#uploadButton").show();
    $("#clearAllButton").show();
};


/**
 * Function that hides the available options for the import panel
 */
var hideImportPanelButtons = function() {
    $("#uploadButton").hide();
    $("#clearAllButton").hide();
};

var showVisualizationModel = function() {
    $("#chart").show();
};

var hideVisualizationModel = function() {
    $("#chart").hide();
};

var showEditor = function() {
    $("#texteditor").show();
};

var hideEditor = function() {
    $("#texteditor").hide();
};

var showDataGrid = function() {
    $("#dataTable").show();
};

var hideDataGrid = function() {
    $("#dataTable").hide();
};

$("#workspace-view").click(function() {

    showVisualizationModel();
    manageImportClose();

});

$("#export").click(function() {
    manageImportClose();
});



var generatePDF = function() {
    alert("Hello");
//    var doc = new jsPDF();
//    doc.text(20, 20, 'Hello world!');
//    doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
//    doc.addPage();
//    doc.text(20, 20, 'Do you like that?');
//    doc.setProperties({
//        title: 'Title',
//        subject: 'This is the subject',
//        author: 'James Hall',
//        keywords: 'generated, javascript, web 2.0, ajax',
//        creator: 'MEEE'
//    });
//
//
//    doc.save('Test.pdf');
//    var name = prompt('What is your name?');
//    var multiplier = prompt('Enter a number:');
//    multiplier = parseInt(multiplier);
//
//    var doc = new jsPDF();
//    doc.setFontSize(22);
//    doc.text(20, 20, 'Questions');
//    doc.setFontSize(16);
//    doc.setFont("helvetica");
//    doc.setFontSize(16);
//    doc.text(20, 30, 'This belongs to: ' + name);
//
//    for(var i = 1; i <= 12; i ++) {
//        doc.text(20, 30 + (i * 10), i + ' x ' + multiplier + ' = ___');
//    }
//
//    doc.addPage();
//    doc.setFontSize(22);
//    doc.text(20, 20, 'Answers');
//    doc.setFontSize(16);
//
//    for(var i = 1; i <= 12; i ++) {
//        doc.text(20, 30 + (i * 10), i + ' x ' + multiplier + ' = ' + (i * multiplier));
//    }
//    doc.save('Test.pdf');
//    var doc = new jsPDF();
//
//doc.text(20, 20, 'This is the default font.');
//
//doc.setFont("courier");
//doc.text(20, 30, 'This is courier normal.');
//
//doc.setFont("times");
//doc.setFontType("italic");
//doc.text(20, 40, 'This is times italic.');
//
//doc.setFont("helvetica");
//doc.setFontType("bold");
//doc.text(20, 50, 'This is helvetica bold.');
//doc.setTextColor(150);
//doc.setFont("courier");
//doc.setFontType("bolditalic");
//doc.text(20, 60, 'This is courier bolditalic.');
//
//doc.save('Test.pdf');
    var pdf = new jsPDF('p','in','letter')

// source can be HTML-formatted string, or a reference
// to an actual DOM element from which the text will be scraped.
        , source = $('#playground')[0]

// we support special element handlers. Register them with jQuery-style
// ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
// There is no support for any other type of selectors
// (class, of compound) at this time.
        , specialElementHandlers = {
            // element with id of "bypass" - jQuery style selector
            '#bypassme': function(element, renderer){
                // true = "handled elsewhere, bypass text extraction"
                return true
            }
        }

// all coords and widths are in jsPDF instance's declared units
// 'inches' in this case
    pdf.fromHTML(
        source // HTML string or DOM elem ref.
        , 0.5 // x coord
        , 0.5 // y coord
        , {
            'width':7.5 // max width of content on PDF
            , 'elementHandlers': specialElementHandlers
        }
    )

    pdf.save('Test.pdf');

};




/**
 * Function that retrieves the example description for the visualization model that
 * is passed as a parameter
 * @param model The url to the example
 *
 */
var fetchExampleDescription = function(model) {

    var getVisualizationModel = function(model) {
        var visModel = null;
        var regex = /(example\/)([\w\-]+)/;
        var match = regex.exec(model);
        if (match != null) {
            visModel = match;
            console.log(visModel);
        }
        return visModel;
    };

    var urlModel = getVisualizationModel(model);
    $.ajax({
        url: model,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
        },
        error: function() {
            console.log("Error");
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

    return;

};


$("#stacked-area-charts").click(function() {
    var todayDateString;
    fetchExampleDescription("/example/stacked");
    todayDateString = new Date().toJSON().slice(0, 10);
    //Possible ajax petition to get the example text
    vex.dialog.open({
        message: 'Stacked Area Charts Example',
        input: "<style>\n    .vex-custom-field-wrapper {\n        margin: 1em 0;\n    }\n    .vex-custom-field-wrapper > label {\n        display: inline-block;\n        margin-bottom: .2em;\n    }\n</style>\n<div class=\"vex-custom-field-wrapper\">\n    <label for=\"date\">Date</label>\n    <div class=\"vex-custom-input-wrapper\">\n        <input name=\"date\" type=\"date\" value=\"" + todayDateString + "\" />\n    </div>\n</div>\n<div class=\"vex-custom-field-wrapper\">\n    <label for=\"color\">Color</label>\n    <div class=\"vex-custom-input-wrapper\">\n        <input name=\"color\" type=\"color\" value=\"#ff00cc\" />\n    </div>\n</div>",
        callback: function(data) {
            if (data === false) {
                return console.log('Cancelled');
            }
            console.log('Date', data.date, 'Color', data.color);
            return $('.demo-result-custom-vex-dialog').show().html("<h4>Result</h4>\n<p>\n    Date: <b>" + data.date + "</b><br/>\n    Color: <input type=\"color\" value=\"" + data.color + "\" readonly />\n</p>");
        }
    });
});


/**
 * Function that manages the showing of popover when
 * the add button is hovered
 */
var showAddPopOver = function() {

    $(".addbtn").hover(function() {
        $(this).popover('show');
    }, function() {
        $(this).popover('hide');
    });

};


/**
 * This function manages the integration of an excel-like grid that
 * mirrors the model that is being visualized
 */
var addDataGrid = function() {

    $("#data-grid").click(function() {
        manageImportClose();
        hideEditor();
        var workspace = $("#workspace");
        var dataTableDiv = $("#dataTable");
        //Doesn't exist create it
        if (dataTableDiv.length == 0) {
            workspace.append('<div id="dataTable"></div>');
            $("#dataTable").handsontable({
                data: [],
                dataSchema: {id: null, name: {first: null, last: null}, address: null},
                startRows: 5,
                startCols: 4,
                colHeaders: [' ', ' ', ' ', ' '],
                columns: [
                    {data: "id"},
                    {data: "name.first"},
                    {data: "name.last"},
                    {data: "address"}
                ],
                minSpareRows: 1
            });
        } else if(dataTableDiv.is(":visible")){
            dataTableDiv.fadeOut();
        } else {
            dataTableDiv.fadeIn();
        }
    });
};

/**
 * This function manages everything with adding a visualization model to svg panel that is
 * in the workspace
 */
var addChartEventHandler = function() {


    var isSVGFree = function() {
        var isFree = false;
        var length = $("svg").children().length;
        if (length == 0) {
            isFree = true;
        }

        return isFree;

    };
    var addBarChart = function() {
        $("#addbar").click(function() {
            if (isSVGFree()) {
                nv.addGraph(function() {
                    var chart = nv.models.multiBarChart()
                            .transitionDuration(350)
                            .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
                            .rotateLabels(0)      //Angle to rotate x-axis labels.
                            .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
                            .groupSpacing(0.1)    //Distance between each group of bars.
                        ;

                    chart.xAxis
                        .tickFormat(d3.format(',f'));

                    chart.yAxis
                        .tickFormat(d3.format(',.1f'));

                    d3.select('#chart1 svg')
                        .datum(exampleData())
                        .call(chart);

                    nv.utils.windowResize(chart.update);

                    return chart;
                });
            }
        });
    };


    var addLineChart = function () {
        if(isSVGFree()) {
            $("#addline").click(function() {



                /*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
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

            });
        }
    }

    var addBubbleChart = function() {
        if(isSVGFree()) {
            $("#addscatterbubble").click(function() {


                nv.addGraph(function() {
                    var chart = nv.models.scatterChart()
                        .showDistX(true)    //showDist, when true, will display those little distribution lines on the axis.
                        .showDistY(true)
                        .transitionDuration(350)
                        .color(d3.scale.category10().range());

                    //Configure how the tooltip looks.
                    chart.tooltipContent(function(key) {
                        return '<h3>' + key + '</h3>';
                    });

                    //Axis settings
                    chart.xAxis.tickFormat(d3.format('.02f'));
                    chart.yAxis.tickFormat(d3.format('.02f'));

                    //We want to show shapes other than circles.
                    chart.scatter.onlyCircles(false);

                    var myData = randomData(4,40);
                    d3.select('#chart svg')
                        .datum(myData)
                        .call(chart);

                    nv.utils.windowResize(chart.update);

                    return chart;
                });

                /**************************************
                 * Simple test data generator
                 */
                function randomData(groups, points) { //# groups,# points per group
                    var data = [],
                        shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
                        random = d3.random.normal();

                    for (i = 0; i < groups; i++) {
                        data.push({
                            key: 'Group ' + i,
                            values: []
                        });

                        for (var j = 0; j < points; j++) {
                            data[i].values.push({
                                x: random()
                                , y: random()
                                , size: Math.random()   //Configure the size of each scatter point
                                , shape: (Math.random() > 0.95) ? shapes[j % 6] : "circle"  //Configure the shape of each scatter point.
                            });
                        }
                    }

                    return data;
                }
            });
        }
    };



    var addPieChart = function() {
        if(isSVGFree()) {
            $("#addpie").click(function() {


                //Regular pie chart example
                nv.addGraph(function() {
                    var chart = nv.models.pieChart()
                        .x(function(d) { return d.label })
                        .y(function(d) { return d.value })
                        .showLabels(true);

                    d3.select("#chart svg")
                        .datum(exampleData())
                        .transition().duration(350)
                        .call(chart);

                    return chart;
                });

//Donut chart example
                nv.addGraph(function() {
                    var chart = nv.models.pieChart()
                            .x(function(d) { return d.label })
                            .y(function(d) { return d.value })
                            .showLabels(true)     //Display pie labels
                            .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
                            .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
                            .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
                            .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
                        ;

                    d3.select("#chart2 svg")
                        .datum(exampleData())
                        .transition().duration(350)
                        .call(chart);

                    return chart;
                });

//Pie chart example data. Note how there is only a single array of key-value pairs.
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
            });
        }
    };

    var addStackedAreaChart = function() {
        if(isSVGFree()) {
            $("#addstacked-area").click(function() {

                /*Data sample:
                 {
                 "key" : "North America" ,
                 "values" : [ [ 1025409600000 , 23.041422681023] , [ 1028088000000 , 19.854291255832],
                 [ 1030766400000 , 21.02286281168],
                 [ 1033358400000 , 22.093608385173],
                 [ 1036040400000 , 25.108079299458],
                 [ 1038632400000 , 26.982389242348]
                 ...

                 */
                d3.json('http://nvd3.org/examples/stackedAreaData.json', function(data) {
                    nv.addGraph(function() {
                        var chart = nv.models.stackedAreaChart()
                            .margin({right: 100})
                            .x(function(d) { return d[0] })   //We can modify the data accessor functions...
                            .y(function(d) { return d[1] })   //...in case your data is formatted differently.
                            .useInteractiveGuideline(true)    //Tooltips which show all data points. Very nice!
                            .rightAlignYAxis(true)      //Let's move the y-axis to the right side.
                            .transitionDuration(500)
                            .showControls(true)       //Allow user to choose 'Stacked', 'Stream', 'Expanded' mode.
                            .clipEdge(true);

                        //Format x-axis labels with custom function.
                        chart.xAxis
                            .tickFormat(function(d) {
                                return d3.time.format('%x')(new Date(d))
                            });

                        chart.yAxis
                            .tickFormat(d3.format(',.2f'));

                        d3.select('#chart svg')
                            .datum(data)
                            .call(chart);

                        nv.utils.windowResize(chart.update);

                        return chart;
                    });
                })

            });
        }
    }




    addBarChart();
    addLineChart();
    addBubbleChart();
    addStackedAreaChart();
    addPieChart();
};


/**
 * This function deals with adding the editor to the workspace
 */
var addEditor = function() {
    $("#editor").click(function () {
        manageImportClose();
        hideDataGrid();
        var workspace = $("#workspace");
        var codeEditor = $("#texteditor");

        if (codeEditor.length == 0) {

            workspace.append('<div id="texteditor"><form><textarea id="code" name="code"></textarea></form></div>');


            var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
                lineNumbers: true,
                mode: "javascript",
                tabMode: 'indent'
            });

        } else if(codeEditor.is(":visible")){
            console.log("It's visible");
            codeEditor.slideUp();
        } else {
            console.log("It's not visible");
            codeEditor.slideDown();
        }

    });
};



/*
 var manageDropzone = function() {
 Dropzone.options.myDropzone = {
 // Prevents Dropzone from uploading dropped files immediately
 autoProcessQueue : false,
 acceptedFiles: 'application/vnd.ms-excel,.txt,.json,.Rdata,text/csv',
 addRemoveLinks: false,
 previewsContainer: null,
 init : function() {
 var submitButton = document.querySelector("#uploadButton");
 var myDropzone = this;

 submitButton.addEventListener("click", function() {
 myDropzone.processQueue();
 // Tell Dropzone to process all queued files.
 });


 // You might want to show the submit button only when
 // files are dropped here:
 this.on("addedfile", function(file) {

 var removeButton = Dropzone.createElement('<button type="button" class="btn btn-danger remove-file">Remove File</button>');

 // Capture the Dropzone instance as closure.
 var _this = this;

 // Listen to the click event
 removeButton.addEventListener("click", function(e) {
 // Make sure the button click doesn't submit the form:
 e.preventDefault();
 e.stopPropagation();

 // Remove the file preview.
 _this.removeFile(file);
 // If you want to the delete the file on the server as well,
 // you can do the AJAX request here.
 });

 // Add the button to the file preview element.
 file.previewElement.appendChild(removeButton);
 $("#uploadButton").show();
 // Show submit button here and/or inform user to click it.
 });

 this.on("success", function(file) {
 ///TODO: Create table with files that have been uploaded by the user if the table exists, then just add files
 ///TODO: Create an additional tab for My Files
 var fileUpload = file["name"];


 //The user has uploaded no previous files
 if ($("#files").length == 0 && localStorage["files"] == null) {
 var menu = $(".menu-options");
 menu.append('<li class="dropdown" id="files"><a class="dropdown-toggle menu-option" href="#">My Files<i class="fa fa-files-o fa-fw menu-glyphicons"></i></a></li>');
 localStorage.setItem("files", JSON.stringify(fileUpload));
 } else {
 //The user has uploaded previous files
 var array = [];
 var filesUploaded = JSON.parse(localStorage.getItem("files"));
 console.log(filesUploaded);
 filesUploaded.push(fileUpload);
 console.log(filesUploaded);
 localStorage.setItem("files", JSON.stringify(fileUpload));
 }

 });
 }
 };


 };
 */

var manageOnlyTableOpen = function() {
    manageImportClose();
    hideVisualizationModel();
    hideEditor();
    hideDataGrid();
};
var fileTable = function() {


    var table = '<div class="bs-example" id="files-table">\
                        <table class="table table-hover">\
                          <thead>\
                            <tr>\
                              <th>#</th>\
                              <th>First Name</th>\
                              <th>Last Name</th>\
                              <th>Username</th>\
                            </tr>\
                          </thead>\
                          <tbody>\
                            <tr>\
                              <td>Mark</td>\
                              <td>Otto</td>\
                              <td>@mdo</td>\
                            </tr>\
                            <tr>\
                              <td>2</td>\
                              <td>Jacob</td>\
                              <td>Thornton</td>\
                              <td>@fat</td>\
                            </tr>\
                            <tr>\
                              <td>3</td>\
                              <td colspan="2">Larry the Bird</td>\
                              <td>@twitter</td>\
                            </tr>\
                          </tbody>\
                        </table>\
                      </div>';
    return table;
};

$(document).click(function() {
//    console.log('Helloasjdlkasjd');

});

var getVisualizationModelTitles = function() {
    var visualizationModels = {};
    var titles = $(".titles p");
    var containerElement = $(".titles");
    var i = 0;
    titles.each(function() {
        visualizationModels[$(this).text()] = containerElement[i];
        i++;
    });

    return visualizationModels;
};

var visualizationModels = getVisualizationModelTitles();


$(function() {
    var modelTitles = getVisualizationModelTitles();
    changeTitleCaretAction();
    $("#dropzone").hide();
    $(".editor").hide();

    showAddPopOver();
    addDataGrid();
    addChartEventHandler();
    addEditor();
    manageImportClose();
    manageImportOpen();
    $("#csv").click(function() {
        $.ajax({
            url: '/csv',
            type: 'GET',
            dataType: '',
            success: function(data) {
                alert("Data received");
            },
            error: function(data) {

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

    });
    $(document).on('click','#files' ,function() {
        manageImportClose();
        manageOnlyTableOpen();
        var fileTable = $("#files-table");
        if(fileTable.length == 0) {
            $("#workspace").prepend(fileTable());
        } else if(fileTable.is(':visible')) {
            fileTable.hide();
        } else {
            fileTable.show();
        }
    });



    $("#search-term").bind('input', function() {

        var input = $(this).val();
        var regex = new RegExp(input.replace(input, '^'+ input), "i");
        $.each(modelTitles, function(index, value) {
            if (!regex.exec(index)) {
                $(value).slideUp();
            } else if(input === "") {
                $(value).slideDown();
            }
        });
    });
});


