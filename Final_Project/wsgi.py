"""
WSGI config for Final_Project project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/howto/deployment/wsgi/
"""

import os
import sys
sys.path.append('/home/ubuntu/FinalProject/Final_Project')
sys.path.append('/home/ubuntu/FinalProject/Final_Project/visualization')
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Final_Project.settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()


#from django.core.wsgi import get_wsgi_application
#from dj_static import Cling

#application = Cling(get_wsgi_application())
