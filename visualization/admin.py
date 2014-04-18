from django.contrib import admin
from .models import VisualizationModelDescription, ProjectDescription, JavaScriptDescription, PythonDescription, RDescription

# This registers the polls to be modifiable for the administrator
admin.site.register(VisualizationModelDescription)
admin.site.register(ProjectDescription)
admin.site.register(JavaScriptDescription)
admin.site.register(PythonDescription)
admin.site.register(RDescription)
