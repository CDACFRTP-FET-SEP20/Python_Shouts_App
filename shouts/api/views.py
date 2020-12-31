from django.shortcuts import render
from .serializers import (
    FriendsSerializer,
    ProfileSerializer,
    UsersSerializer,
    PostsSerializer,
    
    # FriendRequestSendSerializer
)

from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from accounts.models import Profile
from friends.models import Friends
from rest_framework.permissions import IsAuthenticated
from posts.models import Posts
from django.http import HttpResponse
# from django.contrib.auth.models import User


# class FriendsView(viewsets.ModelViewSet):
#     filter_obj = Profile.objects.get(username='shubham')
#     queryset = Friends.objects.filter(
#         sender=filter_obj, is_friend=True
#     ).union(
#         Friends.objects.filter(
#             receiver=filter_obj, is_friend=True
#         ))
#     serializer_class = FriendsSerializer


# Friends GET, PATCH, DELETE, POST methods

@api_view(['GET', 'PATCH', 'DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def FriendsAppView(request, pk):

    # Response for friend list show
    if request.method == 'GET':
        print(request.data)
        filter_obj = Profile.objects.get(user_id=pk)
        friends = Friends.objects.filter(
            sender=filter_obj, is_friend=True
        ).union(
            Friends.objects.filter(
                receiver=filter_obj, is_friend=True
            ))
        serializer = FriendsSerializer(friends, many=True)
        return Response(serializer.data)

# addin new request data in friends table
    if request.method == 'POST':
        list_data = request.data
        sender = Profile.objects.get(user_id=pk)
        receiver = Profile.objects.get(
            user_id=list_data['receiver']['user_id'])
        friends = {
            'sender': sender,
            'receiver': receiver
        }

        serializer = FriendsSerializer(data=friends)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# updating friends table data for accepting friend request or deleting it
    if request.method == 'PATCH':
        accept_data = request.data
        print("accept_data", accept_data['is_friend'])
        if accept_data['is_friend'] == False:
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

# Removing friend from friends list
    if request.method == 'DELETE':
        friends = Friends.objects.get(id=pk)
        friends.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# for seeing Profile data
class ProfileView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


# friend request list
@api_view(['GET'])
def FriendRequestList(request, pk):
    filter_obj = Profile.objects.get(user_id=pk)
    friends = Friends.objects.filter(
        receiver=filter_obj,
        is_friend=False
    )
    serializer = FriendsSerializer(friends, many=True)
    return Response(serializer.data)


# fetching list for making new friends
@api_view(['GET'])
def MakeNewFriends(request, pk):
    filter_obj = Profile.objects.get(user_id=pk)
    newfriends = Profile.objects.all().exclude(
        user_id__in=(Friends.objects.filter(sender=filter_obj)
                     .values_list('receiver')
                     .union(Friends.objects.filter(receiver=filter_obj))
                     .values_list('sender')))

    serializer = ProfileSerializer(newfriends, many=True)
    return Response(serializer.data)

# ===============Shouts======================================

class UserViewSet(viewsets.ModelViewSet):
    queryset=Profile.objects.all().order_by('username')
    serializer_class=UsersSerializer

class MyPostsViewSet(viewsets.ModelViewSet):
    print("mypost")
    queryset=Posts.objects.filter(username="21972bf4-f2c5-4658-b08a-6378034f8ee1").order_by('-date_posted')
    serializer_class=PostsSerializer

# def MyPostsViewSet(request,pk):
#     filter_obj = Profile.objects.get(user_id=pk)
#     queryset=Posts.objects.filter(username=filter_obj).order_by('-date_posted')
#     serializer=PostsSerializer(queryset,many=True)


class PostsViewSet(viewsets.ModelViewSet):
    queryset=Posts.objects.all().order_by('-date_posted')
    serializer_class=PostsSerializer

    def get(self, request): 
        detail = [ {"name": detail.name,"detail": detail.detail}  
        for detail in Posts.objects.all()] 
        return Response(detail)


    # def post(self,request,*args,**kwargs):
    #     post_type=request.data['post_type']
    #     title=request.data['title']
    #     description=request.data['description']
    #     date_posted=request.data['date_posted']
    #     username=request.data['username']['user_id']
    #     media=request.data['media']
    #     post=Posts.objects.create(post_type=post_type,
    #     title=title,description=description,
    #     date_posted=date_posted,username=username,
    #     media=media
    #     )
        
        # return HttpResponse({'message':'Post created!'},status=200)

        def delete(request, pk):
            post = Posts.objects.get(pk=post_id)
            if request.user== post.username:
                Post.objects.get(pk=post_id).delete()
            return HttpResponse({'message':'Post deleted!'},status=200)