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



//Change the import caret to face down so that the user knows a dropdown is coming
var changeImportCaretOnEvent = function() {
    var importOption = $("#import");
    var importCaret = $("#import-caret");
    importOption
    .mouseenter(function() {
        importCaret.addClass('fa-caret-down').removeClass('fa-caret-right');
        importOption.addClass('open');
    })
    .click(function() {
        if(importCaret.hasClass('fa-caret-right')) {
            importCaret.addClass('fa-caret-down').removeClass('fa-caret-right');
        } else {
            importCaret.addClass('fa-caret-right').removeClass('fa-caret-down');
        }
    })
    .mouseleave(function() {
        importCaret.addClass('fa-caret-right').removeClass('fa-caret-down');
        importOption.removeClass('open');
    });
};


var changeExportCaretOnEvent = function() {
    var exportOption = $("#export");
    var exportCaret = $("#export-caret");
    exportOption
    .mouseenter(function() {
        exportCaret.addClass('fa-caret-down').removeClass('fa-caret-right');
        exportOption.addClass('open');
    })
    .mouseleave(function() {
        exportCaret.addClass('fa-caret-right').removeClass('fa-caret-down');
        exportOption.removeClass('open');
    })
    .click(function() {
        if(exportCaret.hasClass('fa-caret-right')) {
            exportCaret.addClass('fa-caret-down').removeClass('fa-caret-right');
        } else {
            exportCaret.addClass('fa-caret-right').removeClass('fa-caret-down');
        }
    });
};





