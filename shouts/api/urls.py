from django.urls import path, include
from .views import (
    FriendsView,
    ProfileView,
    FriendRequestList,
    MakeNewFriends,
    FriendsAppView
)
from rest_framework import routers

router = routers.DefaultRouter()

friendList = FriendsView.as_view(
    {
        'get': 'list',
        'post': 'create',
        'patch': 'partial_update',
        'delete': 'destroy'
    }
)


friendRequestList = FriendRequestList.as_view({
    'get': 'list',
    # 'post': 'create',
    'patch': 'partial_update',
    'delete': 'destroy'
})

profileList = ProfileView.as_view({
    'get': 'list',
    'post': 'create',
    'patch': 'partial_update',
    'delete': 'destroy'
})

makefriendsList = MakeNewFriends.as_view({
    'get': 'list',
    # 'post': 'create',
})

urlpatterns = [
    path('', include(router.urls)),
    # path('friendlist/', friendList, name='friendList'),
    path('friendlist/', FriendsAppView.as_view(), name='FriendsAppView'),
    path('friendlist/<str:pk>', friendList, name='friendList'),
    path('profile/', profileList, name='profileList'),
    path('profile/<str:pk>', profileList, name='profileList'),
    path('requestreceived/', friendRequestList, name='friendRequestList'),
    path('requestreceived/<str:pk>', friendRequestList, name='friendRequestList'),
    path('requestsent/', makefriendsList, name='makefriendsList'),
    path('requestsent/<str:pk>', makefriendsList, name='makefriendsList'),
]
