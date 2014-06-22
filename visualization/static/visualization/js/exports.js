'use strict';

/**
 * This is the module that allows for the exportation
 * of the svg that is present in the interface
 */

var exportExtensions = {
    "PDF": "pdf",
    "PNG": "png",
    "SVG": "svg",
    "JPEG": "jpg",
    "CSV": "csv",
    "R": "R",
    "Python": "py",
    "Excel": "xslx"
};

/**
 * This method deals with the exportation of the SVG
 * to the desired output format
 *
 * @param outputFormat The output format
 * @return
 *
 */
var exportTo = function(outputFormat) {
    var processUrl;

    /**
     * This returns the url that will be used to send the input file
     * @param outputFormat
     */
    var convertSVGToOutput = function(outputFormat) {


        $.ajax({
            url: 'https://api.cloudconvert.org/process',
            type: 'POST',
            dataType: '',
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
                file: "http://cl.ly/0S3P0o3X192J/newfile.svg",
                filename: "newfile.svg",
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

/**
     * Inializes the current svg with namespaces and title attributes so
     * that it can be sent to the server
     * @param filename
     * @returns {string|*}
     */
    var initializeSVG = function(filename) {
        var html = d3.select("svg")
            .attr("title", $.trim(filename))
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .node().parentNode.innerHTML.trim();

        return html;
    };

var sendSVGInfo = function(filename) {


    var svg = initializeSVG(filename);

    $.ajax({
        url: '/export/'+filename,
        type: 'POST',
        dataType: 'JSON',
        headers: {
            'X-CSRFToken' : $.cookie('csrftoken')
        },
        data: {
            svg: $.base64.encode(svg)
        },
        success: function(response) {
            if (response.success === 1) {
                window.location = response.url;
            }

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



var exportFile = {
    name: undefined,
    'pdf': function(filename) {

    },
    'py': function(filename) {
        window.location = '/export/'+filename
    },
    "png": function() {

    },
    "svg": function(filename) {

        var svg = btoa(initializeSVG(filename));
        window.location = '/exportSVG/'+filename+'/'+svg+'/'
    },
    "jpg": function() {

    },
    "csv": function() {

    },
    "R": function(filename) {
        window.location = '/export/'+filename
    },
    "xslx": function() {

    }
};
