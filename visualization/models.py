from django.db import models
import datetime
from django.utils import timezone

class VisualizationModelDescription(models.Model):
    """
    This class represents the basic information that
    must be known about a visualization model
    """
    title = models.CharField(primary_key=True,max_length=50, db_index=True)
    description = models.TextField(db_index=True, max_length=350)
    image = models.FilePathField(db_index=True, blank=True)
    link = models.CharField(db_index=True, blank=True, max_length=20)

    def __str__(self):
        return self.title + " " + self.link



class UploadFile(models.Model):
    """
    This class represents the class in which the user can upload
    files
    """
    file = models.FileField(upload_to='files/%Y/%m/%d')