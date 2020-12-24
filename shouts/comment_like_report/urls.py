# from django.urls import path
# from . import views

# # from comment_like_report.views import AppView

# urlpatterns = [
#     path('shout/', views.shout),
#     path('shoutcomment/', views.shoutComment),
#     path('shoutlike/', views.shoutLike),
# ]
from django.urls import path , include
from . import views
from .views import UserViewSet, ShoutViewSet , CommentViewSet , LikeViewSet , ReportViewSet
from rest_framework import routers


router = routers.DefaultRouter()
router.register('shout', ShoutViewSet)

user_list = UserViewSet.as_view({
    "get" : "list",
    "post" : "create"
})

user_details = UserViewSet.as_view({
    "get" : "retrieve",
    "patch" : "partial_update",
    "delete" : "destroy"
})

shout_list = ShoutViewSet.as_view({
    "get" : "list",
    "post" : "create"
})

shout_details = ShoutViewSet.as_view({
    "get" : "retrieve",
    "patch" : "partial_update",
    "delete" : "destroy"
})

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

report_list = ReportViewSet.as_view({
    "get" : "list",
    "post" : "create"
})


urlpatterns = [
    path('' ,include(router.urls)),
    path('user/', user_list, name = 'user_list'),
    path('userDetails/<str:pk>', user_details, name = 'user'),
    path('shout/', shout_list, name = 'shout'),
    path('shoutDetails/<str:pk>', shout_details, name = 'shout_details'),
    path('shoutcomment/', comment_list, name = 'shoutcomment'),
   # path('commentDetails/<str:pk>', comment_details, name = 'comment_details'),
    path('shoutlike/', like_list, name = 'shoutlike'),
    path('shoutreport/', report_list, name = 'shoutreport'),
]