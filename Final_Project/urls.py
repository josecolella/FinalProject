from django.conf.urls import patterns, include, url

from django.contrib import admin
from visualization import views
from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

# this is the router of the project defining the views that map to
# certain url


admin.autodiscover()

urlpatterns = patterns('',
                       # Examples:
                       url(r'^$', views.Index.as_view(), name='index'),
                       url(r'^accounts/authenticate', views.authenticateView, name='authenticate'),
                       url(r'^accounts/signin', views.signin, name='signin'),
                       url(r'^accounts/signup', views.signup, name='signup'),
                       url(r'^example/(?P<visualization>\w+)',
                           views.ExampleView.as_view(), name='example'),
                       url(r'^about/', views.AboutView.as_view(), name='about'),
                       url(r'^import/', views.DropZoneView.as_view(), name='import'),
                       url(r'^files/', views.fileview, name='file'),
                       url(r'^createSVG/', views.createSVGview, name='createcsv'),
                       url(r'^exportData/', views.exportDataView, name='exportData'),
                       url(r'^export/(?P<filename>[a-zA-Z]+\d*\.[a-zA-Z]{1,4})', views.exportView, name='export'),
                       url(r'^exportClear/', views.exportClearView, name='exportClear'),
                       url(r'^admin/', include(admin.site.urls), name='admin'),


                       ) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

