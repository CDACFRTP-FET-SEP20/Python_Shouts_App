from django.urls import path, include
from .views import FriendsView, ProfileView
from rest_framework import routers

router = routers.DefaultRouter()

friendList = FriendsView.as_view({
    'get': 'list',
    'post': 'create',
    'patch': 'partial_update',
    'delete': 'destroy'
})


profileList = ProfileView.as_view({
    'get': 'list',
    'post': 'create',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('', include(router.urls)),
    path('friends/', friendList, name='friendList'),
    path('friends/<str:pk>', friendList, name='friendList'),
    path('profile/', profileList, name='profileList'),
    path('profile/<str:pk>', profileList, name='profileList'),
]
