from django.contrib import admin
from .models import VisualizationModelDescription

# This registers the polls to be modifiable for the administrator
admin.site.register(VisualizationModelDescription)
