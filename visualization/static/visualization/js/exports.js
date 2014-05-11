'use strict';

/**
 * This is the module that allows for the exportation
 * of the svg that is present in the interface
 */



/**
 * This method deals with the exportation of the SVG
 * to the desired output format
 *
 * @param outputFormat The output format
 * @return
 *
 */
var exportSVG = function(outputFormat) {
    var processUrl;


    var convertSVGToOutput = function(outputFormat) {


        $.ajax({
            url: 'https://api.cloudconvert.org/process',
            type: 'POST',
            dataType: 'json',
            data: {
                apikey: 't-APsbQ2IpfweLVeBQZgeZi4hEluptiRiJiImQuJuwiZ0ARQUIQ4hMCIDwSb8_Vg92Wp316XSdJDHUhIqzO1ug',
                inputformat: "svg",
                outputformat: outputFormat
            },
            success: function(data) {
                processUrl = data.url;
                convertProcess(outputFormat);
            },
            error: function() {
                console.log("error");
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
    };

    var convertProcess = function(outputFormat) {
        $.ajax({
            url: 'https:'+processUrl,
            type: 'POST',
            dataType: 'json',
            data: {
                input: "download",
                file: "http://cl.ly/1X310P2q3132/test2.svg",
                filename: "test2.svg",
                outputformat: outputFormat
            },
            success: function(data) {
                window.open(data.output.url);
            },
            error: function() {
                console.log("error");
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
    };

    convertSVGToOutput(outputFormat);

};


$(document).ready(function() {

    $('#exportPng').on('click', function() {
        exportSVG("png");
    });

    $('#exportPdf').on('click', function() {
        exportSVG("pdf");
    });

    $('#exportJpeg').on('click', function() {
        exportSVG("jpg");
    });
});
