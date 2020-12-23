from django.shortcuts import render
from .serializers import (
    FriendsSerializer,
    ProfileSerializer,
    # FriendRequestSendSerializer
)
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
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


class FriendsAppView(APIView):
    
    def get(self, request):
        print("data print--", request.query_params)
        filter_obj = Profile.objects.get(username='shubham')
        friends = Friends.objects.filter(
            sender=filter_obj, is_friend=True
        ).union(
            Friends.objects.filter(
                receiver=filter_obj, is_friend=True
            ))
        serializer = FriendsSerializer(friends, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        list_data = request.data
        print("list_data--", list_data['sender']['id'])
        sender = Profile.objects.get(id=list_data['sender']['id'])
        receiver = Profile.objects.get(id=list_data['receiver']['id'])
        print("sender--", sender)
        print("receiver--", receiver)
        friends=Friends.objects.create(sender= sender, receiver= receiver)
        serializer = FriendsSerializer(data=friends, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


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
