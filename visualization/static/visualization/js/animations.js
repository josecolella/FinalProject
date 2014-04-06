'use strict';

//Changes icon
var changeIconAction = function() {
    var dropdown = $(".dropdown-icon");
    if (dropdown.hasClass('glyphicon-chevron-right')) {
        dropdown.addClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-right');
    } else  {
        dropdown.addClass('glyphicon-chevron-right').removeClass('glyphicon-chevron-down');
    }

//$( "body" ).click(function( event ) {
//    console.log($(event.target).parent().parent());
//    var parent = $(event.target).parent().parent();
//    console.log(parent[0].className);
//
//    var classes = $(event.target.className.split(" "));
//    $.each(classes, function( index, value ) {
//        if (value === "glyphicon-chevron-right") {
//            $(event.target)
//                .addClass("glyphicon-chevron-down")
//                .removeClass("glyphicon-chevron-right");
//        } else if(value === "glyphicon-chevron-down") {
//            $(event.target)
//                .addClass("glyphicon-chevron-right")
//                .removeClass("glyphicon-chevron-down");
//        }
//    });
//});
};


/**
 * Function created to manage the change of icons when a user clicks to see
 * the visualization model
 */
function changeIcon() {
    $(".titles" ).bind( "click", function() {
        changeIconAction();
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





