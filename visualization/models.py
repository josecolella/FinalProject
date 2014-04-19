from django.db import models
import datetime
from django.utils import timezone


class VisualizationModelDescription(models.Model):

    """
    This class represents the basic information that
    must be known about a visualization model
    """
    title = models.CharField(primary_key=True, max_length=50, db_index=True)
    description = models.TextField(db_index=True, max_length=350)
    image = models.FilePathField(db_index=True, blank=True)
    link = models.CharField(db_index=True, blank=True, max_length=50)

    def __str__(self):
        return self.title + " " + self.link


class UploadFile(models.Model):

    """
    This class represents the class in which the user can upload
    files
    """
    file = models.FileField(upload_to='files/%Y/%m/%d')


class Description(models.Model):

    """
    Denotes what a description should be like. Meta class
    """
    description = models.TextField(db_index=True, max_length=200)

    meta = True


class ProjectDescription(Description):

    """
    This class represents the information about the project
    and what is trying to be accomplished. This is what is
    known as the
    Application Definition Statement.
    Concise 1-sentence declaration of what your app does and who it's specifically aimed at.

    What is the application experience like?
    What is the application meant to do?
    Who is the intended audience?
    """
    title = models.CharField(db_index=True, max_length=50)


class JavaScriptDescription(Description):
    pathToImage = models.CharField(max_length=50)


class PythonDescription(Description):
    pathToImage = models.CharField(max_length=50)


class RDescription(Description):
    pathToImage = models.CharField(max_length=50)
