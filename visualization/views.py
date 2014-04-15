from django.shortcuts import render, render_to_response
from django.http import HttpResponse
from django.views.generic import ListView, TemplateView
from django.template import RequestContext
from setuptools.compat import BytesIO

from .forms import UploadFileForm
from .models import UploadFile
from .models import VisualizationModelDescription

from reportlab.pdfgen import canvas


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
    model = VisualizationModelDescription.objects.all()

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, {
                                                    'models': self.model,
                                                    'form': self.form_class
                                                    })

    def post(self, request):
        form = self.form_class(request.POST, request.FILES)
        if form.is_valid():
            new_file = UploadFile(file=request.FILES['file'])
            new_file.save()
        else:
            form = self.form_class

        data = {'form': form}
        return render_to_response(self.template_name, data, context_instance=RequestContext(request))


class AboutView (TemplateView):
    """
    This class deals with the about part of the project that
    explains the underlying principles of the projects and
    the importance of visualization models
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
