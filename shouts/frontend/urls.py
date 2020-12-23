from django.urls import path

from frontend.views import AppView
from api.views import FriendsView, ProfileView, FriendRequestList


# friendList = FriendsView.as_view({
#     'get': 'list',
#     'post': 'create',
#     'patch': 'partial_update',
#     'delete': 'destroy'
# })


# friendRequestList = FriendRequestList.as_view({
#     'get': 'list',
#     # 'post': 'create',
#     'patch': 'partial_update',
#     'delete': 'destroy'
# })

# profileList = ProfileView.as_view({
#     'get': 'list',
#     'post': 'create',
#     'patch': 'partial_update',
#     'delete': 'destroy'
# })

urlpatterns = [
    path('', AppView.as_view(), name='app'),
    path(r'<path:path>', AppView.as_view()),
]
