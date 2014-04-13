'use strict';

var i = 0;
var rightStateClass = "glyphicon-chevron-right";
var downStateClass = 'glyphicon-chevron-down';
/**
 * Function created to manage the change of icons when a user clicks to see
 * the visualization model. Uses $(this) to make sure that only one caret moves
 * since the carets use the same clas
 */
var changeTitleCaretAction = function(event) {

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
 * Function that binds the submit event to the search when the search glyphicon is clicked
 */
var search = function() {
    $('.glyphicon-search').bind("click", function() {
        if(!$("#search-term").val()) {
            alert("Search valid models");
        } else {
            $("#search").submit();

        }
    });
};


/**
 * Function that handles the fading out of the import panel
 */
var manageImportClose = function() {
    var dropzone = $("#dropzone");
    if (dropzone.is(":visible")) {
        dropzone.fadeOut("fast");
        $("#import-info").remove();
    }
}


$("#import").click(function() {
    var dropzone = $("#dropzone");
    if (dropzone.is(":visible")) {
        dropzone.fadeOut("slow");
        $("#import-info").remove();
    } else {
        dropzone.fadeIn("slow");
        dropzone.prepend("<div class='alert alert-info fade in' id='import-info'><button type='button' class='close data-dismiss='alert' aria-hidden='true' onclick='closeAlert();'>×</button><strong>Drop</strong> or <strong>Click</strong> on the panel below to import your data sets</div>");

    }

});


var closeAlert = function() {
    $(".alert")
        .alert("close");
}


$("#workspace").click(function() {
    manageImportClose();

});

$("#export").click(function() {
    manageImportClose();
});


$("#editor").click(function() {
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