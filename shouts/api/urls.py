from django.urls import path,include
from rest_framework import routers
from .views import UserViewSet,PostsViewSet


router=routers.DefaultRouter()
router.register(r'users',UserViewSet)
router.register(r'posts',PostsViewSet)
# post_list=EmployeeViewSet.as_view({
#     'get':'retrieve',
#     'patch':'partial_update',
#     'delete':'destroy'
# })
urlpatterns=[
    path('',include(router.urls)),
    
]