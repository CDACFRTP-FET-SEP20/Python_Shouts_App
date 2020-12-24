from django.shortcuts import render
from .serializers import (
    FriendsSerializer,
    ProfileSerializer,
    # FriendRequestSendSerializer
)

from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
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


@api_view(['GET', 'PATCH', 'DELETE', 'POST'])
def FriendsAppView(request, pk):

    if request.method == 'GET':
        print(request.data)
        filter_obj = Profile.objects.get(id=pk)
        friends = Friends.objects.filter(
            sender=filter_obj, is_friend=True
        ).union(
            Friends.objects.filter(
                receiver=filter_obj, is_friend=True
            ))
        serializer = FriendsSerializer(friends, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        list_data = request.data
        # print(request.data)
        # print("list_data--", list_data['receiver']['id'])
        sender = Profile.objects.get(id=pk)
        receiver = Profile.objects.get(id=list_data['receiver']['id'])
        # print("sender--", sender)
        # print("receiver--", receiver)
        friends = {
            'sender': sender,
            'receiver': receiver
        }
        # friends = Friends.objects.create(sender=sender, receiver=receiver)
        serializer = FriendsSerializer(data=friends)
        if serializer.is_valid():
            # print("Post serializer")
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # print("POST serializer is not valid")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'PATCH':
        accept_data = request.data
        print("accept_data", accept_data['is_friend'])
        if accept_data['is_friend'] == False:
            # friends = Friends.objects.filter(
            #     id=accept_data['id']).update(is_friend=True)
            change = {
                'is_friend': True
            }
            friends = Friends.objects.get(id=accept_data['id'])
            serializer = FriendsSerializer(friends, data=change, partial=True)
            if serializer.is_valid():
                print("False Patch serializer")
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            print("Not Valid False Patch serializer")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if accept_data['is_friend'] == True:
            print("--------true")
            friends = Friends.objects.get(id=accept_data['id'])
            friends.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    if request.method == 'DELETE':
        friends = Friends.objects.get(id=pk)
        friends.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# class FriendsAppView(APIView):

#     def get(self, request):
#         filter_obj = Profile.objects.get(username='shubham')
#         friends = Friends.objects.filter(
#             sender=filter_obj, is_friend=True
#         ).union(
#             Friends.objects.filter(
#                 receiver=filter_obj, is_friend=True
#             ))
#         serializer = FriendsSerializer(friends, many=True)
#         return Response(serializer.data)

#     def post(self, request, *args, **kwargs):
#         list_data = request.data
#         print("list_data--", list_data['sender']['id'])
#         sender = Profile.objects.get(id=list_data['sender']['id'])
#         receiver = Profile.objects.get(id=list_data['receiver']['id'])
#         print("sender--", sender)
#         print("receiver--", receiver)
#         friends=Friends.objects.create(sender= sender, receiver= receiver)
#         serializer = FriendsSerializer(data=friends, many=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors)


class ProfileView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


# class FriendRequestList(viewsets.ModelViewSet):
#     queryset = Friends.objects.filter(is_friend=False)
#     serializer_class = FriendsSerializer


@api_view(['GET'])
def FriendRequestList(request, pk):
    filter_obj = Profile.objects.get(id=pk)
    friends = Friends.objects.filter(
        sender=filter_obj, is_friend=False
    ).union(
        Friends.objects.filter(
            receiver=filter_obj, is_friend=False
        ))
    serializer = FriendsSerializer(friends, many=True)
    return Response(serializer.data)

# class MakeNewFriends(viewsets.ModelViewSet):
#     filter_obj = Profile.objects.get(username='shubham')
#     queryset = Profile.objects.all().exclude(
#         id__in=(Friends.objects.filter(sender=filter_obj)
#                 .values_list(
#             'receiver').union(Friends.objects.filter(receiver=filter_obj))
#             .values_list('sender')))

#     serializer_class = ProfileSerializer


@api_view(['GET'])
def MakeNewFriends(request, pk):
    filter_obj = Profile.objects.get(id=pk)
    newfriends = Profile.objects.all().exclude(
        id__in=(Friends.objects.filter(sender=filter_obj)
                .values_list('receiver')
                .union(Friends.objects.filter(receiver=filter_obj))
                .values_list('sender')))

    serializer = ProfileSerializer(newfriends, many=True)
    return Response(serializer.data)
