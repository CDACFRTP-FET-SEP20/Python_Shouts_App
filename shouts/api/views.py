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
    filter_obj = Profile.objects.get(username='shubham')
    queryset = Friends.objects.filter(
        sender=filter_obj, is_friend=True
    ).union(
        Friends.objects.filter(
            receiver=filter_obj, is_friend=True
        ))
    serializer_class = FriendsSerializer


class ProfileView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class FriendRequestList(viewsets.ModelViewSet):
    queryset = Friends.objects.filter(is_friend=False)
    serializer_class = FriendsSerializer


class MakeNewFriends(viewsets.ModelViewSet):
    filter_obj = Profile.objects.get(username='shubham')
    queryset = Profile.objects.all().exclude(
        id__in=(Friends.objects.filter(sender=filter_obj)
                .values_list(
            'receiver').union(Friends.objects.filter(receiver=filter_obj))
            .values_list('sender')))

    serializer_class = ProfileSerializer
