from django.urls import path
from . import views

# from comment_like_report.views import AppView

urlpatterns = [
    path('shout/', views.shout),
    path('shoutcomment/', views.shoutComment),
    path('shoutlike/', views.shoutLike),
]