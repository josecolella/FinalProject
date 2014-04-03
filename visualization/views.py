from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic

from .models import VisualizationModelDescription

#The render() function takes the request object as its first argument,
#  a template name as its second argument and a dictionary as its optional third argument.
#  It returns an HttpResponse object of the given template rendered with the given context.

# def index(request):
#     latest_poll_list = Poll.objects.all().order_by('-pub_date')[:5]
#     context = {'latest_poll_list': latest_poll_list}
#     return render(request, 'visualization/index.html')


class IndexListView (generic.ListView):
    """
    This is the view that deals with the main page
    """
    template_name = 'visualization/index.html'
    model = VisualizationModelDescription



class About (generic.TemplateView):
    """
    This class deals with the about part of the project that
    explains the underlying principles of the projects and
    the importance of visualization models
    """

    def get(self, request, *args, **kwargs):
        pass



