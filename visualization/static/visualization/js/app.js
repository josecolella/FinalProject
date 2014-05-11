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
    $("#container").show();
};

var hideVisualizationModel = function() {
    $("#container").hide();
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


/*
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

 */


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

var visualizationModels = getVisualizationModelTitles();

var exportCSV = function() {

};



var saveFileAsPrompt = function(chart, file) {
    vex.dialog.prompt({
        message: 'Save '+file.toUpperCase()+' file as...',
        placeholder: 'data.'+file.toLowerCase()+'...',
        contentClassName: 'alert-vex-content',
        closeClassName: 'alert-vex-close',
        callback: function(value) {
            console.log(value)
        }
    });
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
        console.log("Hello");
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

        $("#files-table").css('display', 'inline-grid');
        hideVisualizationModel();
    });


    $('#exportCsv').click(function () {

    });

    $('#exportR').click(function() {
        saveFileAsPrompt(chart, "r");
    });

    $('#exportPython').click(function() {
        saveFileAsPrompt(chart, "py");
    });


});


