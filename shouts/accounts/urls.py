from django.urls import path

from . import views
from .views import ProfileViewSets , LoginViewSets



profile_list = ProfileViewSets.as_view({
    "get" : "list"
})

profile_register = ProfileViewSets.as_view({
    "post" : "create"
})

# get_user = LoginViewSets.as_view({
#     "get" : "retrieve"
# })

profile_single = ProfileViewSets.as_view({
    "get" : "retrieve",
    "patch" : "partial_update",
    "delete" : "destroy",
})




urlpatterns = [

    path('profilelist/' , profile_list, name="profile-list"),
    path('register/' , profile_register, name="profile-register"),
    # path('myprofile/<str:pk>' , profile_single, name="profile-single"),
    path('login/' , LoginViewSets.as_view() , name="login-user"),
    path('getProfile/<str:pk>', profile_single,name="get-user"),
    path('updateProfile/<str:pk>', profile_single ,name="update-user")
]
