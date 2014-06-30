# Django modules
from django.shortcuts import render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic import ListView, TemplateView
from django.template import RequestContext
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.core.files.base import ContentFile
# Application modules
from .forms import UploadFileForm, SignUpForm, SignInForm
from .models import UploadFile, UserUploadedFiles,VisualizationModelDescription, UploadSVGFile
from .GraphicsFileWriter import *
from .ExportUtils import *
# Python modules
import re
import base64


class Index (ListView):
    """
    This is the view that deals with the main page.
    This deals with the different visualization models
    and the user's workspace.
        - Checks if the user is authenticated. If he is
        authenticated exposes the user's uploaded files
    """
    template_name = 'visualization/index.html'
    form_class = UploadFileForm
    model = sorted(VisualizationModelDescription.objects.all())

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            try:
                userUploadedFiles = UserUploadedFiles.objects.get(user=request.user)
                data = {
                    'models': self.model,
                    'form': self.form_class,
                    'files': userUploadedFiles.uploadedFiles
                }
            except UserUploadedFiles.DoesNotExist:
                data = {
                    'models': self.model,
                    'form': self.form_class
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

                userUploadedFiles = UserUploadedFiles.objects.get(user=request.user)
                userUploadedFiles.uploadedFiles.append({
                    'filename': new_file.file.name,
                    'fileurl': re.sub(r'/media/', r'/media/files/', new_file.file.url),
                    'filesize': new_file.file.size
                })


                new_file.save()
                userUploadedFiles.save()

            data = {
                'form': form,
                'files': userUploadedFiles.uploadedFiles
            }

            return render_to_response(self.template_name, data, context_instance=RequestContext(request))
        else:
            print('Here2')
            response_data = {'success': 0, 'message': 'Only authenticated user can upload files'}
            return HttpResponse(json.dumps(response_data), content_type='application/json');


def fileview(request):
    """
    This view manages the ajax request for a user's files. Returns the user's uploaded files
    """

    if request.is_ajax():
        if request.user.is_authenticated():
            userFiles = UserUploadedFiles.objects.get(user=request.user)
            # User has no uploaded files
            if len(userFiles.uploadedFiles) == 0:
                return HttpResponse(userFiles.uploadedFiles)
            else:
                return HttpResponse(json.dumps(userFiles.uploadedFiles), content_type="application/json")



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
            response_data['status'] = form.error_messages
            return HttpResponse(response_data['status'])



def signin(request):
    """
    This view provides the sign in for the user
    """
    template_name = 'visualization/authentication/signin.html'
    sign_in_form = SignInForm

    if request.method == 'GET':
        return render_to_response(template_name, {
            'sign_in_form': sign_in_form
        }, context_instance = RequestContext(request))


def signup(request):
    """
    This view provides the signup for the user
    """
    template_name = 'visualization/authentication/signup.html'
    sign_up_form = SignUpForm

    if request.method == 'GET':
        return render_to_response(template_name, {
            'sign_up_form': sign_up_form
        }, context_instance = RequestContext(request))


def logoutView(request):
    """
    The view that logout an authenticated user that was signed in with dajngo auth
    logout(request) -> HTTPResponseRedirect(reverse('index')) -> Send to index page
    """
    # Log out user that was logged in with django auth

    logout(request)
    request.session.clear()

    return HttpResponseRedirect(reverse('about'))

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


def exportDataView(request):
    """
    This allows for the data to be initialized so that it can be exported
    """
    if request.is_ajax():
        ExportUtils.initializeExportData(request.POST['data'],
                                         request.POST['xAxis'],
                                         request.POST['yAxis'],
                                         request.POST['type'])

        if ExportUtils.isValidExport():
            response_data = {'success': 1}
        else:
            response_data = {'success': 0}
        return HttpResponse(json.dumps(response_data), content_type="application/json")

def exportClearView(request):
    """
    This views clears the information held in ExportUtils
    """
    if request.is_ajax():
        ExportUtils.clear()
        if not ExportUtils.isValidExport():
            response_data = {'success': 1}
        else:
            response_data = {'success': 0}
        return HttpResponse(json.dumps(response_data), content_type="application/json")


def exportView(request, filename):
    """
    This view provides the R and Python files
    """
    response = None

    if re.search(r'[a-zA-Z]+\d*\.{}'.format('py'), filename):
        if ExportUtils.isValidExport():
            pyGraph = PythonGraphicsFileWriter(ExportUtils.data,
                                               ExportUtils.xAxis.decode('utf-8'),
                                               ExportUtils.yAxis.decode('utf-8'),
                                               ExportUtils.graphType.decode('utf-8'))
            pyGraph.write(filename, toFile=False)
            response = HttpResponse(pyGraph.fileContent, content_type='text/x-python')
            response['Content-Disposition'] = 'attachment; filename="{}"'.format(filename)
        else:
            response = HttpResponseRedirect(reverse('index'))
    elif re.search(r"[a-zA-Z]+\d*\.{}".format("R"), filename):
        if ExportUtils.isValidExport():
            rGraph = RGraphicsFileWriter(ExportUtils.data,
                                         ExportUtils.xAxis.decode('utf-8'),
                                         ExportUtils.yAxis.decode('utf-8'),
                                         ExportUtils.graphType.decode('utf-8'))
            rGraph.write(filename, toFile=False)
            response = HttpResponse(rGraph.fileContent, content_type='text/plain')
            response['Content-Disposition'] = 'attachment; filename="{}"'.format(filename)
        else:
            response = HttpResponseRedirect(reverse('index'))

    return response


def exportSVG(request, filename, svg):
    """
    View that returns an svg file with the visualization model
    """
    svgContent = base64.b64decode(svg)
    response = HttpResponse(svgContent, content_type='image/svg+xml')
    response['Content-Disposition'] = 'attachment; filename="{}"'.format(filename)
    return response



def createSVGView(request, filename):
    """
    This view receives the svg information from the workspace and saves the file
    """
    if request.is_ajax():
        print('here')
        filenameRegex = re.search(r'(?P<filename>[a-zA-Z]+[\d\.]*)\.(?P<extension>[a-zA-Z]{1,4}$)', filename)
        cleanFileName = filenameRegex.group('filename')
        cleanFileExtension = filenameRegex.group('extension')
        newFile = ContentFile(cleanFileName+'.svg', 'w')
        newFile.name = cleanFileName+'.svg'


        fileContent = base64.b64decode(request.POST['svg']).decode('utf-8')

        newFile.write(fileContent)


        newFileDB = UploadSVGFile(file=newFile)
        newFileDB.save()



        # response_data = {'url': newFileDB.file.url, 'file': newFile}
        response_data = {
            'success': 1,
            'url': newFileDB.file.url,
            'filename': filename,
            'extension': cleanFileExtension
        }

        return HttpResponse(json.dumps(response_data), content_type="application/json")
        # response = HttpResponse(newFile, mimetype='image/svg+xml')
        # response['Content-Disposition'] = 'attachment; filename="newfile.svg"'
        # return response