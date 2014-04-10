from django.conf.urls import patterns, include, url

from django.contrib import admin
from visualization import views

#this is the router of the project defining the views that map to
#certain url


admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', views.Index.as_view(), name='index'),
    url(r'^about/', views.AboutView.as_view(), name='about'),
    url(r'^admin/', include(admin.site.urls), name='admin'),
)
