from django.urls import path, include
from .views import (
    # FriendsView,
    ProfileView,
    FriendRequestList,
    MakeNewFriends,
    FriendsAppView,
    UserViewSet,PostsViewSet,MyPostsViewSet
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

router.register(r'users',UserViewSet)
router.register(r'posts',PostsViewSet)

# my_post_list=MyPostsViewSet.as_view({
#     'get':'list',
#     'post':'create',
#     'patch':'partial_update',
#     'delete':'destroy'
# })
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
    path('mypostlist/<str:pk>/', MyPostsViewSet, name='my_post_list'),


]

