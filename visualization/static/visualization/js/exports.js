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
    "R": "R",
    "Python": "py",
    "JSON": "json"
};

/**
 *
 * @param processUrl
 * @param outputFormat
 * @param fileUrl
 * @param fileName
 */
var startConversionProcess = function(processUrl, outputFormat, fileUrl, fileName) {
	var publicFileUrl = window.location.origin + fileUrl;
	console.log(publicFileUrl);
	console.log(outputFormat)
	var realProcessUrl = 'https:'+processUrl;
	console.log(realProcessUrl);
	console.log(fileName);

        $.ajax({
            url: 'https:'+processUrl,
            type: 'POST',
            dataType: 'json',
            data: {
                input: "download",
                file: publicFileUrl,
                filename: fileName,
                outputformat: outputFormat
            },
            success: function(response) {
                window.location = response.output.url;
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


/**
 *
 * @param outputFormat
 * @param fileUrl
 * @param filename
 */
var createProcessID = function(outputFormat, fileUrl, filename) {


    $.ajax({
        url: 'https://api.cloudconvert.org/process',
        type: 'POST',
        dataType: 'json',
        data: {
            apikey: 't-APsbQ2IpfweLVeBQZgeZi4hEluptiRiJiImQuJuwiZ0ARQUIQ4hMCIDwSb8_Vg92Wp316XSdJDHUhIqzO1ug',
            inputformat: "svg",
            outputformat: outputFormat
        },
        success: function(response) {
            if (response.url !== undefined) {
                var processUrl = response.url
		var regex = /\/([^\/]+\.[a-zA-Z]+)$/;
		var regexResult = regex.exec(fileUrl);
		if (regexResult) {
			var realFileName = regexResult[1];
			startConversionProcess(processUrl, outputFormat, fileUrl, realFileName); 
		}


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
        .node()
        .parentNode
        .innerHTML
        .trim();

    return html;
};


/**
 *
 * @param filename
 */
var sendSVGInfo = function(filename) {


    var svg = initializeSVG(filename);

    $.ajax({
        url: '/createSVG/'+filename,
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
                createProcessID(response['extension'],response['url'], response['filename']);
                console.log('Extension: '+response['extension']);
                console.log('Filename: '+response['filename']);
                console.log('Url: '+response['url']);

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
    'pdf': function(filename) {
        sendSVGInfo(filename);
    },
    'py': function(filename) {
        window.location = '/export/'+filename
    },
    "png": function(filename) {
        sendSVGInfo(filename);
    },
    "svg": function(filename) {
        var svg = btoa(initializeSVG(filename));
        window.location = '/exportSVG/'+filename+'/'+svg+'/';
    },
    "jpg": function(filename) {
        sendSVGInfo(filename);
    },
    "R": function(filename) {
        window.location = '/export/'+filename;
    },
    "json": function(filename) {
        window.location = '/exportJSON/'+filename;
    }
};
