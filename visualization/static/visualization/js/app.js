'use strict';

var i = 0;
var rightStateClass = "glyphicon-chevron-right";
var downStateClass = 'glyphicon-chevron-down';
var csv;
var columnHeaders = [];
var toggleSideBarMessage = 'Hide Sidebar';


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
        hideFileTable();

        if ($('#file').length !== 0) {

            $('#files-table').css('display', 'none');

        }
        var dropzone = $("#dropzone");
        if (dropzone.is(":visible")) {
            dropzone.fadeOut("slow");
            $("#import-info").remove();
            hideImportPanelButtons();

        } else {
            dropzone.fadeIn("slow");
            dropzone.prepend("<div class='alert alert-info fade in' id='import-info'><button type='button' class='close data-dismiss='alert' aria-hidden='true'>×</button><strong>Drop</strong> or <strong>Click</strong> on the panel below to import your data sets <b>(Accepted Files: <em>excel [xlsx, xls]</em>, <em>json</em>, <em>csv</em>, <em>txt</em>)</b></div>");

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

var showFileTable = function() {

    $("#files-table").css('display', 'inline-grid');
};

var hideFileTable = function() {
    $("#files-table").css('display', 'none');
};

$("#workspace-view").click(function() {

    showVisualizationModel();
    manageImportClose();

});



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
var addDataGrid = function(data) {


    var dataTable = $('#dataTable');

    //Event handler for when the data-grid btn is clicked
    $("#data-grid").click(function(data) {
        manageImportClose();
        hideEditor();
        showVisualizationModel();
        $("#files-table").hide();

        var workspace = $("#workspace");
        var dataTableDiv = $("#dataTable");
        //Doesn't exist create it
        function buildMenu(activeCellType){
            var menu = $('<ul></ul>').addClass('changeTypeMenu');

            $.each(['text', 'numeric', 'date'], function (i, type) {
                var item = $('<li></li>').data('colType', type).text(type);

                if(activeCellType == type){
                    item.addClass('active');
                }

                menu.append(item);

            });


            return menu;

        };

        //Creates the x button so that the user can choose what the data represents
        var buildXCoordinateButton = function() {

            var buttonX = $('<button></button>');

            buttonX.attr({
                'class':'btn btn-default btn-sm selectxlabel',
                'data-toggle': 'button'
            })
                .html('Set as <strong>x</strong>');

            buttonX.click(function() {
                if (buttonX.hasClass('btn-primary')) {
                    buttonX.removeClass('btn-primary')
                        .addClass('btn-default');

                } else {
                    buttonX.removeClass('btn-default')
                        .addClass('btn-primary');
                }
            });


            return buttonX;
        };
        //Creates the y button so that the user can choose what the data represents
        var buildYCoordinateButton = function() {


            var buttonY = $('<button></button>');

            buttonY.attr({
                'class':'btn btn-default btn-sm selectylabel',
                'data-toggle': 'button'
            })
                .html('Set as <strong>y</strong>');

            //Click Handler for the y axis button
            buttonY.click(function() {
                if (buttonY.hasClass('btn-primary')) {
                    buttonY.removeClass('btn-primary')
                        .addClass('btn-default');

                } else {
                    buttonY.removeClass('btn-default')
                        .addClass('btn-primary');
                }
            });
            return buttonY;
        };


        var buildAxisButtonOptions = function() {

            var axisButtonsSection = $('<div></div>');

            axisButtonsSection.addClass('btn-group')
                .append(buildXCoordinateButton())
                .append(buildYCoordinateButton());


            return axisButtonsSection;
        };

        function buildButton() {
            return $('<button></button>').addClass('changeType').html('\u25BC');
        };

        if (dataTableDiv.length == 0) {
            workspace.append('<div id="dataTable" style="overflow: scroll"></div>');
            $("#dataTable").handsontable({
                minRows: 20,
                maxRows: 1000,
                minCols: 20,
                maxCols: 50,
                rowHeaders: true,
                colHeaders: true,
                minSpareRows: 1,
                contextMenu: true,
                manualColumnResize: true,
                currentRowClassName: 'currentRow',
                currentColClassName: 'currentCol',
                autoWrapRow: true,
                stretchH: 'all',
                width: 1140,
                height: 400,
                afterGetColHeader: function (col, rowHeader) {
                    var instance = this;
                    rowHeader.appendChild(buildAxisButtonOptions()[0]);
                },
                cells: function (row, col, prop) {
                    if (row === 0) {
                        var cellProperties = {
                            type: 'text' //force text type for first row
                        };
                        return cellProperties;
                    }
                }
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


var manageOnlyTableOpen = function() {
    manageImportClose();
    hideVisualizationModel();
    hideEditor();
    hideDataGrid();
};

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


/**
 * Loads the save as dialog so that the user can put a file name
 *
 * @param extension The extension of the file
 */
var saveFileAsPrompt = function(extension) {

    vex.dialog.prompt({
        message: 'Save as...',
        placeholder: 'filename.'+extension+' here...',
        contentClassName: 'alert-vex-content',
        closeClassName: 'alert-vex-close',
        callback: function(filename) {
            console.log(filename);
            var regex = /(\w+\d*)(\.[a-zA-Z]+)?/;
            var checkFilename = regex.exec($.trim(filename));
            var cleanfilename;
            //Check for incorrect filename and add appropiate extension if needed
            if (checkFilename[2] === undefined && checkFilename[1] !== undefined) {
                cleanfilename = $.trim(checkFilename[1]) + "."+ extension;
                exportFile[extension](cleanfilename);
            } else {
                exportFile[extension]($.trim(filename));
            }



        }
    });
};

/**
 * Removes the currently viewed visualization model
 */
var clearCurrentVisualizationModel = function() {
    $("#chart").children().remove();
    $.ajax({
        url: '/exportClear/',
        type: 'POST',
        dataType: 'json',
        headers: {
            'X-CSRFToken' : $.cookie('csrftoken')
        },
        success: function(response) {
            if (response.success !== 1) {
                vex.dialog.alert('Unable to clear data');
            }
        },
        error: function() {
            console.log('Error');
        }
    });
};



/**
 * returns the extension for the file
 * @param filename
 * @returns {Array|{index: number, input: string}}
 */
var fileExtension = function(filename) {
    var regex = /\.([a-z]+)$/;
    var fileExten = regex.exec(filename);

    if (fileExten != null) {
        fileExten = fileExten[1];
    }

    return fileExten;

};

/**
 * Sets the handsontable with the columns and data that it needs to show to
 * the user in the step dubbed `pre-visualization`
 * @param object columns The column names
 * @param object data The reference to the data
 */
var initializeDataGrid = function(columns, data) {
    $('#dataTable').handsontable({
        colHeaders: columns,
        data: data
    });
};


/**
 * Process the XML file that is located at the specified url, initialize the
 * data for the visualization model, and executes a callback
 */
var processXMLFileContents = function(url)  {
    var x2js = new X2JS();

    d3.xml(url, function(error, data) {
        if (!error) {
            console.log(data);
            var xmlDocument = x2js.xml2json(data.documentElement);
            visualize.inputData = xmlDocument[Object.keys(xmlDocument)[0]];
            var columnNames = Object.keys(visualize.inputData[0]);
            visualize.cf = crossfilter(visualize.inputData);
            initializeDataGrid(columnNames, visualize.inputData);
        }
    });
};

/**
 * Processes the CSV file that is located in the url that is passed
 * as a parameter
 *
 * @param url
 */
var processCSVFileContents = function(url) {

    d3.csv(url, function(error, data) {
        if (!error) {
            console.log(data);
            visualize.inputData = data;
            var columnNames = Object.keys(data[0]);
            visualize.cf = crossfilter(visualize.inputData);
            initializeDataGrid(columnNames, visualize.inputData);
        }
    });

};


/**
 * Processes the json that is located in the url, initializes the data and
 * binds the data to the grid
 * @param string url The url where the json is located
 */
var processJSONFileContents = function(url) {

    d3.json(url, function(error, data) {
        if (!error) {
            visualize.inputData = data;
            var columnNames = Object.keys(data[0]);
            visualize.cf = crossfilter(visualize.inputData);
            initializeDataGrid(columnNames, visualize.inputData);
        }

    });
};


/**
 * This function processes the contents of an excel file and binds the data to the handsontable
 *
 * @param string url The url where the excel file (xlsx, xls) is located
 * @param string extension The extension for the file
 */
var processExcelFileContents = function(url, extension) {

    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open("GET", url, true);
    ajaxRequest.responseType = "arraybuffer";
    //The excel file
    var workbook;
    var sheetList;

    ajaxRequest.onload = function(e) {
        var arraybuffer = ajaxRequest.response;

        /* convert data to binary string */
        var data = new Uint8Array(arraybuffer);
        var arr = [];
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");

        //Check whether it is an excel 2007+ document (xlsx) or an (xls) document
        if (extension === "xlsx") {
            //Read the data from the excel (xlsl) document
            workbook = XLSX.read(bstr, {type:"binary"});
            // All the sheets that are present in the notebook
            sheetList = workbook.SheetNames;
            //Transform data into json
            visualize.inputData = $.map(sheetList, function(sheet, index) {
                return XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            });
        } else if(extension === "xls") {
            //Read the data from the excel (xls) document
            workbook = XLS.read(bstr, {type:"binary"});
            //All the sheets in the workbook
            sheetList = workbook.SheetNames;
            //Transform data inot json
            visualize.inputData = $.map(sheetList, function(sheet, index) {
                return XLS.utils.sheet_to_json(workbook.Sheets[sheet]);
            });
        }

        var columnNames = Object.keys(visualize.inputData[0]);
        visualize.cf = crossfilter(visualize.inputData);
        initializeDataGrid(columnNames, visualize.inputData);
    };

    ajaxRequest.send();
};


$(function() {


    //Shows the Filter feature for the search input functionality
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

    $("#authetication").click(function() {
        vex.dialog.open({
            message: 'Enter your username and password:',
            input: "<input name=\"username\" type=\"text\" placeholder=\"Username\" required />\n<input name=\"password\" type=\"password\" placeholder=\"Password\" required />",
            buttons: [
                $.extend({}, vex.dialog.buttons.YES, {
                    text: 'Login'
                }), $.extend({}, vex.dialog.buttons.NO, {
                    text: 'Back'
                })
            ],
            callback: function(data) {
                if (data === false) {
                    return console.log('Cancelled');
                }

                return console.log('Username', data.username, 'Password', data.password);
            }
        });
    });

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

    $(document).on('click','#files' ,function() {

        showFileTable();
        hideVisualizationModel();
        manageImportClose();
        $("#dataTable").hide();

    });


    $(".file-location").click(function(e) {
        e.preventDefault();
        hideFileTable();
        showVisualizationModel();

        $('#data-grid').click();

        var file = $(this);
        var url = file.attr('href');


        var extension = fileExtension($.trim(file.text()));


        switch (extension) {

            case 'json':
                console.log('Its a JSON file');
                processJSONFileContents(url);
                break;
            case 'csv':
                console.log('Its a CSV file');
                processCSVFileContents(url);
                break;
            case 'xlsx':
            case 'xls':
                console.log('It\'s an excel file');
                processExcelFileContents(url, extension);
                break;
            case 'xml':
                console.log('It\'s and XML file');
                processXMLFileContents(url);
                break;
            default:
                break;
        }

        $("#dataTable").focus();






    });

    /**
     * Click handler for when the export button is clicked.
     */
    $("#export").click(function() {
        manageImportClose();
        hideFileTable();
        showVisualizationModel();
        vex.dialog.open({
            message: 'Export as...',
            input: "<style>\n    .vex-custom-field-wrapper {\n        margin: 1em 0;\n    }\n    .vex-custom-field-wrapper > label {\n        display: inline-block;\n        margin-bottom: .2em;\n    }\n</style>\n<div class=\"vex-custom-field-wrapper\">\n  <div class=\"vex-custom-input-wrapper\">\n        <select class=\"form-control\" id=\"exportSelect\">\n  <option>PDF</option>\n  <option>PNG</option>\n  <option>SVG</option>\n  <option>JPEG</option>\n <option>CSV</option>\n <option>R</option>\n <option>Python</option>\n <option>Excel</option>\n</select>\n    </div>\n</div>\n",
            callback: function(data) {
                if (data === false) {
                    return console.log('Cancelled');
                }
                if ($("#chart > svg").length !== 0) {
                    var fileType = $("#exportSelect option:selected").text();
                    var extension = exportExtensions[fileType];
                    saveFileAsPrompt(extension);
                    return console.log();
                } else {
                    vex.dialog.alert('To export, a visualization model must be created first.');
                }
            }
        });
    });


    //Click handler for when the toggle sidebar button is clicked
    //This means that once it is clicked the sidebar is hidden,
    //and if it clicked again the sidebar is shown again
    $("#toggle-sidebar").click(function() {
        var sidebar = $(".sidebar");
        if (sidebar.is(":hidden")) {

            sidebar.show('slide', {
                direction : 'left'
            }, 200);
            $("#toggle-sidebar").css('margin-left', '15.5em').attr('data-title', 'Show Sidebar');
            $("#playground").addClass('col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2');
        } else {
            $("#toggle-sidebar").css('margin-left', '-0.5em')
                .attr('data-title', 'Hide Sidebar');
            sidebar.hide('slide', {
                direction : 'left'
            }, 200);
            $("#playground").removeClass('col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2');

        }
    });

    $("#toggle-sidebar").tooltip({
        placement: "right",
        title: toggleSideBarMessage,
        trigger: 'hover'
    });


    /**
     * Click handler for when the user wants to add a visualization model to the workspace
     */
    $(".addbtn").click(function() {
        var visualizationModel = $(this);
        var chart = visualizationModel.parent().text().toLowerCase();
        hideDataGrid();
        if (visualize.cf !== null) {
            if (visualize.config.x != null && visualize.config.y != null) {
                switch (chart) {
                    case 'pie': //Generate a pie chart
                        visualize.pieChart(chart);
                        break;
                    case 'bar':
                        visualize.barChart(chart);
                        break;
                    case 'box':
                        visualize.boxChart(chart);
                        break;
                    case 'curve':
                        visualize.curveChart(chart);
                        break;
                    case 'histogram':
                        visualize.histogram(chart);
                        break;
                    case 'line':
                        visualize.lineChart(chart);
                        break;
                    case 'scatter/bubble':
                        var regex = /\/(.+)/;
                        var chart = regex.exec(chart) !== null ? regex.exec(chart)[1] : '';
                        visualize.bubbleChart(chart);
                        break;
                    case 'stacked area':
                        var chart = (chart.split(" ")).join("");
                        visualize.stackedChart(chart);
                        break;
                    default :
                        break;

                }
            } else {
                vex.dialog.alert('An x and y axis must be chosen');
            }
        } else {
            vex.dialog.alert('A dataset must be chosen');
        }

    });

    //Click handler to set the axis for the visualization model
    $(document).on('click', '.htCore > thead > tr > th > .btn-group', function() {
        var axisField = $(this);
        var field = axisField.prev().text();
        var axis = axisField.find(".active").children("strong").text();

        if (axis !== "") {
            //The user wants the column as the x and y axis
            if (axis.length > 1) {
                var cleanAxis = axis.charAt(axis.length - 1);
                visualize.config[cleanAxis] = field;
            }
            if (visualize.config.axis == null) {
                visualize.config[axis] = field;
            }
        }


    });


    $("#clearCurrentModel").on('click', function() {
        var chart = $("#chart");
        if (chart.children().length !== 0) {
            clearCurrentVisualizationModel();
        }
    });

    $("#clearCurrentModel").tooltip({
        trigger: 'hover',
        title: 'Clear Visualization Model',
        placement: 'right'
    });


});


