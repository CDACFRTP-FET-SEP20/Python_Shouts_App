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
router.register(r'shout', ShoutViewSet)
router.register(r'user',UserViewSet)

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

like_details = LikeViewSet.as_view({
    "get" : "retrieve",
    "patch" : "partial_update",
    "delete" : "destroy"
})

report_list = ReportViewSet.as_view({
    "get" : "list",
    "post" : "create"
})


urlpatterns = [
    path('' ,include(router.urls)),
    path('user/', user_list, name = 'user_list'),
    path('user/<str:pk>', user_details, name = 'user_details'),
    path('shout/', shout_list, name = 'shout_list'),
    path('shout/<str:pk>', shout_details, name = 'shout_details'),
    path('shoutcomment/', comment_list, name = 'shoutcomment'),
    # path('commentDetails/<str:pk>', comment_details, name = 'comment_details'),
    path('shoutlike/', like_list, name = 'shoutlike'),
    path('likeDelete/<str:pk>', like_details, name = 'like_Delete'),
    path('shoutreport/', report_list, name = 'shoutreport'),
]