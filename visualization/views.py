import json
from django.shortcuts import render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic import ListView, TemplateView, View
from django.template import RequestContext
from setuptools.compat import BytesIO
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage
from django.core.files import File
from django.core.servers.basehttp import FileWrapper

from .forms import UploadFileForm, SignUpForm, SignInForm
from .models import UploadFile, UserUploadedFiles,VisualizationModelDescription, UploadSVGFile

from reportlab.pdfgen import canvas
import csv
import re
import base64

import tempfile
from pandas import Series, DataFrame
import pandas

import io
#The render() function takes the request object as its first argument,
#  a template name as its second argument and a dictionary as its optional third argument.
#  It returns an HttpResponse object of the given template rendered with the given context.

# def index(request):
#     latest_poll_list = Poll.objects.all().order_by('-pub_date')[:5]
#     context = {'latest_poll_list': latest_poll_list}
#     return render(request, 'visualization/index.html')


class Index (ListView):
    """
    This is the view that deals with the main page.
    This deals with the different visualization models
    and the user's workspace
    """
    template_name = 'visualization/index.html'
    form_class = UploadFileForm
    model = sorted(VisualizationModelDescription.objects.all())

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            userUploadedFiles = UserUploadedFiles.objects.get(user=request.user)
            data = {
                'models': self.model,
                'form': self.form_class,
                'files': userUploadedFiles.uploadedFiles
            }
        else:
            data = {
                'models': self.model,
                'form': self.form_class
            }

        return render(request, self.template_name, data)

    def post(self, request):
        form = self.form_class(request.POST, request.FILES)
        if request.user.is_authenticated():
            if form.is_valid():

                new_file = UploadFile(file=request.FILES['file'])
                print(new_file)
                userUploadedFiles = UserUploadedFiles.objects.get(user=request.user)
                print(userUploadedFiles.uploadedFiles)
                userUploadedFiles.uploadedFiles.append({
                    'filename': new_file.file.name,
                    'fileurl': re.sub(r'/media/', r'/media/files/', new_file.file.url),
                    'filesize': new_file.file.size
                })


                new_file.save()
                userUploadedFiles.save()
            else:
                form = self.form_class
                return HttpResponseRedirect(reverse('authenticate'))

            data = {
                'form': form,
                'files': userUploadedFiles.uploadedFiles
            }

            return render_to_response(self.template_name, data, context_instance=RequestContext(request))



def fileview(request):
    """
    This view manages the ajax request for a user's files
    """

    if request.is_ajax():
        if request.user.is_authenticated():
            userFiles = UserUploadedFiles.objects.get(user=request.user)
            # User has no uploaded files
            if len(userFiles.uploadedFiles) == 0:
                return HttpResponse(userFiles.uploadedFiles)
            else:
                return HttpResponse(json.dumps(userFiles.uploadedFiles), content_type="application/json")
        else:
            #Return error
            pass

def authenticateView(request):
    """
    The view that manages the authentication of the user
    """
    template_name = 'visualization/authentication.html'


    if request.method == "GET":
        form = SignInForm
        data = {
            'sign_in_form': form

        }
        return render_to_response(template_name, data, context_instance = RequestContext(request))

    elif request.method == 'POST':
        form = None
        if 'password' in request.POST:
            form = SignInForm(request.POST)
        if 'password2' in request.POST:
            form = SignUpForm(request.POST)
        response_data = {}
        if 'password' in request.POST:
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    print("Hello")
                    login(request, user)
                    request.session['user'] = user.username
                    response_data['status'] = reverse('index')
                    return HttpResponse(json.dumps(response_data), content_type="application/json")
                else:
                    response_data['status'] = 0
                    return HttpResponse(json.dumps(response_data), content_type="application/json")
            else:
                response_data['status'] = 0
                return HttpResponse(json.dumps(response_data), content_type="application/json")

        elif form.is_valid():
            cleaned_data = form.clean()
            user = User.objects.filter(username=cleaned_data.get('username'))
            if 'password2' in request.POST:
                # User doesn't exist
                if len(user) == 0:
                    username = cleaned_data.get('username')
                    password1 = cleaned_data.get('password1')
                    password2 = cleaned_data.get('password2')
                    if password1 == password2 and len(password1) != 0:
                        if len(username) != 0:
                            saveUser = User.objects.create_user(username=username, password=password1)
                            files = UserUploadedFiles(user = saveUser,uploadedFiles = [])
                            saveUser.save()
                            files.save()
                            response_data['status'] = 1
                        return HttpResponse(json.dumps(response_data), content_type="application/json")
                    else:
                        response_data['status'] = 0
                    return HttpResponse(json.dumps(response_data), content_type="application/json")
                else:
                    response_data['status'] = 0
                    return HttpResponse(json.dumps(response_data), content_type="application/json")


        else:

            print("asdasd")
            response_data['status'] = form.error_messages
            return HttpResponse(response_data['status'])



def signin(request):
    """
    This view provides the
    """
    template_name = 'visualization/authentication/signin.html'
    sign_in_form = SignInForm

    if request.method == 'GET':
        return render_to_response(template_name, {
            'sign_in_form': sign_in_form
        }, context_instance = RequestContext(request))


def signup(request):
    template_name = 'visualization/authentication/signup.html'
    sign_up_form = SignUpForm

    if request.method == 'GET':
        return render_to_response(template_name, {
            'sign_up_form': sign_up_form
        }, context_instance = RequestContext(request))




class ExampleView (ListView):
    """
    This view provides the different examples of how to use the visualization
    models.
    """
    def get(self, request, *args, **kwargs):

        return HttpResponse(self.kwargs['visualization'])
        #self.kwargs['slug']



class AboutView (TemplateView):
    """
    This class deals with the about part of the project that
    explains the underlying principles of the projects and
    the importance of visualization models.
    Since it only provides information, it extends a TemplateView
    """
    template_name = 'visualization/about.html'





def some_view(request):

    # Create the HttpResponse object with the appropriate PDF headers.
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="somefilename.pdf"'

    buffer = BytesIO()

    # Create the PDF object, using the BytesIO object as its "file."
    p = canvas.Canvas(buffer)
    p.setFont("Helvetica", 14)
    # Draw things on the PDF. Here's where the PDF generation happens.
    # See the ReportLab documentation for the full list of functionality.
    p.drawString(100, 100, "Hello world.")

    # Close the PDF object cleanly.
    p.showPage()
    p.save()

    # Get the value of the BytesIO buffer and write it to the response.
    pdf = buffer.getvalue()
    buffer.close()
    response.write(pdf)
    return response

class DropZoneView(TemplateView):
    """
    This class manages the dropzone where the user can upload files
    """
    template_name = 'visualization/dropzone.html'
    form_class = UploadFileForm



def some_view_csv(request):
    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="somefilename.csv"'

    writer = csv.writer(response)
    writer.writerow(['First row', 'Foo', 'Bar', 'Baz'])
    writer.writerow(['Second row', 'A', 'B', 'C', '"Testing"', "Here's a quote"])

    return response


class CSVReader(View):
    """
    The view that deals with the generation of csv
    """
    def get(self, request, *args, **kwargs):
        """
        The get method
        """
        pass



def createSVGview(request):
    """
    This view receives the svg information from the workspace and saves the file
    """
    if request.is_ajax():
        newFile = ContentFile('newfile.svg', 'w')
        newFile.name = 'newfile.svg'
        newFile.write(str(base64.b64decode(request.POST['svg'])).strip())

        newFileDB = UploadSVGFile(file=newFile)
        newFileDB.save()


        response_data = {'url': re.sub(r'/media/', r'/media/files/', newFileDB.file.url)}
        return HttpResponse(json.dumps(response_data), content_type="application/json")

