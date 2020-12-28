from django.urls import path,include
from rest_framework import routers
from .views import UserViewSet,PostsViewSet,MyPostsViewSet


router=routers.DefaultRouter()
router.register(r'users',UserViewSet)
router.register(r'posts',PostsViewSet)

my_post_list=MyPostsViewSet.as_view({
    'get':'list',
    'post':'create',
    'patch':'partial_update',
    'delete':'destroy'
 })
urlpatterns=[
    path('',include(router.urls)),
    path('mypostlist/<str:pk>/', my_post_list, name='my_post_list'),
]