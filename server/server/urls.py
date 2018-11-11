"""server URL Configuration"""

from django.contrib import admin
from django.urls import path
from listner.views import *
from django.conf.urls import url


"""
to get user_id => 
    http://localhost:8000/token/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbF9pZCI6ImFidUBhYnUuY29tIn0.5VfNFD7KIssWaO9ZN-eAxR6tuPVf9tWC054BeJ7fj34/
to login =>
    http://localhost:8000/login


"""
urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^login$', login),
    url(r'^token/(?P<uid>.*)/$', getEmailId),
]
