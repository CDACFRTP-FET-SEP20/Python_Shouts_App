from django.urls import path,include
from rest_framework import routers
from .views import UserViewSet,PostsViewSet

router=routers.DefaultRouter()
router.register(r'users',UserViewSet)
router.register(r'posts',PostsViewSet)

urlpatterns=[
    path('',include(router.urls)),
    
]