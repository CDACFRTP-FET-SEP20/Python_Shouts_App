from django.urls import path

from frontend.views import AppView

urlpatterns = [
    
    # this route catches the "blank" URL with no path specified. you can link to it in most places
    path(r'', AppView.as_view()),
    # this route catches any url below the main one, so the path can be passed to the front end
    path(r'<path:path>', AppView.as_view()),
]
