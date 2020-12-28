from django.urls import path

from frontend.views import AppView

urlpatterns = [
    # path('', AppView.as_view(), name='app'),
    path(r'', AppView.as_view()),
    path(r'<path:path>', AppView.as_view()),
]
