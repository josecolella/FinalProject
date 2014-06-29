# Django modules
from django.db import models
from django.contrib.auth.models import User
import jsonfield


class VisualizationModelDescription(models.Model):

    """
    This class represents the basic information that
    must be known about a visualization model
    """
    title = models.CharField(primary_key=True, max_length=50, db_index=True)
    description = models.TextField(db_index=True, max_length=350)

    def __str__(self):
        return self.title + " " + self.link

    def __lt__(self, other):
        try:
            if self.title < other.title:
                return True
            else:
                return False
        except Exception:
            print("Cannot compare objects")

    def __gt__(self, other):
        try:
            if self.title > other.title:
                return True
            else:
                return False
        except Exception:
            print("Cannot compare objects")

    def __ge__(self, other):
        try:
            if self.title >= other.title:
                return True
            else:
                return False
        except Exception:
            print("Cannot compare objects")

    def __le__(self, other):
        try:
            if self.title <= other.title:
                return True
            else:
                return False
        except Exception:
            print("Cannot compare objects")


class UploadFile(models.Model):

    """
    This class represents the class in which the user can upload
    files
    """
    file = models.FileField(upload_to='files/')

    def __str__(self):
        return self.file.url


class UploadSVGFile(models.Model):
    """
    This class represents the class where the svg files are uploaded
    """
    file = models.FileField(upload_to='svg/')

    def __str__(self):
        return self.file.url

    def delete(self, *args, **kwargs):
        self.image.delete(False)
        super(UploadSVGFile, self).delete(*args, **kwargs)

class UserUploadedFiles(models.Model):
    """
    This class represents the user that will be using the service
    """
    user = models.ForeignKey(User)
    uploadedFiles = jsonfield.JSONField(db_index=True, blank=True)

    def __str__(self):
        """
        __str__() -> String representation of a visualization user
        Returns the users username, email, and uploadedFiles
        """
        return str(self.user)

