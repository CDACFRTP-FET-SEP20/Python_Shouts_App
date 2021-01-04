from django.urls import path, include
from .views import (
    # FriendsView,
    ProfileView,
    FriendRequestList,
    MakeNewFriends,
    FriendsAppView,
    UserViewSet,PostsViewSet,MyPostsViewSet,PostsViewSetPatchDelete,
    CommentViewSet,LikeViewSet
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
# router.register(r'shouts',PostsViewSetPatchDelete)

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

# =====================Like and Comment========================
comment_list = CommentViewSet.as_view({
    "get" : "list",
    "post" : "create"
})

comment_details = CommentViewSet.as_view({
    "get" : "retrieve",
    "patch" : "partial_update",
    "delete" : "destroy"
})

like_list = LikeViewSet.as_view({
    "get" : "list",
    "post" : "create"
})

like_details = LikeViewSet.as_view({
    "get" : "retrieve",
    "patch" : "partial_update",
    'delete':'destroy'
})

urlpatterns = [
    path('', include(router.urls)),
    path('friendlist/<str:pk>', FriendsAppView, name='FriendsAppView'),
    path('posts/', PostsViewSet, name='PostsViewSet'),
    path('shouts/<str:pk>/', PostsViewSetPatchDelete, name='PostsViewSetPatchDelete'),
    path('profile/', profileList, name='profileList'),
    path('profile/<str:pk>', profileList, name='profileList'),
    path('requestreceived/<str:pk>', FriendRequestList, name='FriendRequestList'),
    path('requestsent/<str:pk>', MakeNewFriends, name='MakeNewFriends'),
    path('mypostlist/<str:pk>/', MyPostsViewSet, name='my_post_list'),
    path('shoutcomment/', comment_list, name = 'shoutcomment'),
    
    path('shoutlike/', like_list, name = 'shoutlike'),
    path('shoutlike/<str:pk>/',like_details, name = 'like_Delete'),


]

