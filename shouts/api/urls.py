from django.urls import path, include
from .views import (
    # FriendsView,
    ProfileView,
    FriendRequestList,
    MakeNewFriends,
    FriendsAppView
)
from rest_framework import routers

router = routers.DefaultRouter()

# friendList = FriendsView.as_view(
#     {
#         'get': 'list',
#         'post': 'create',
#         'patch': 'partial_update',
#         'delete': 'destroy'
#     }
# )


profileList = ProfileView.as_view({
    'get': 'list',
    'post': 'create',
    'patch': 'partial_update',
    'delete': 'destroy'
})


urlpatterns = [
    path('', include(router.urls)),
    path('friendlist/<str:pk>', FriendsAppView, name='FriendsAppView'),
    path('profile/', profileList, name='profileList'),
    path('profile/<str:pk>', profileList, name='profileList'),
    path('requestreceived/<str:pk>', FriendRequestList, name='FriendRequestList'),
    path('requestsent/<str:pk>', MakeNewFriends, name='MakeNewFriends'),
]
