__author__ = 'josecolella'

import json
import base64

class ExportUtils:
    """docstring for ExportUtils"""

    data = None
    xAxis = None
    yAxis = None
    graphType = None

    @staticmethod
    def initializeExportData(data, xAxis, yAxis, graphType):
        """
        Initializes all the static class variables from the AJAX post
        """
        ExportUtils.data = json.loads(data)
        ExportUtils.xAxis = base64.b64decode(xAxis)
        ExportUtils.yAxis = base64.b64decode(yAxis)
        ExportUtils.graphType = base64.b64decode(graphType)

    @staticmethod
    def isValidExport():
        """
        Checks whether all the variables are initialized
        """
        isValid = False
        verify = [i for i in (ExportUtils.data, ExportUtils.xAxis, ExportUtils.yAxis, ExportUtils.graphType) if
                  i is not None]
        lenExportUtils = 4
        if len(verify) == lenExportUtils:
            isValid = True
        return isValid

