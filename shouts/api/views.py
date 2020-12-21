from django.shortcuts import render
from .serializers import (
    FriendsSerializer,
    ProfileSerializer,
    # FriendRequestSendSerializer
)
from rest_framework import viewsets, permissions
from users.models import Profile
from friends.models import Friends
from django.contrib.auth.models import User
# Create your views here.


class FriendsView(viewsets.ModelViewSet):
    queryset = Friends.objects.all()
    serializer_class = FriendsSerializer


class ProfileView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

# class FriendRequestList(viewsets.ModelViewSet):
#     queryset= User.objects.all()
