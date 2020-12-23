from django.shortcuts import render
from rest_framework import viewsets,permissions
from .serializers import UsersSerializer,PostsSerializer
from users.models import Users
from posts.models import Posts
from django.http import HttpResponse
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset=Users.objects.all().order_by('username')
    serializer_class=UsersSerializer

class PostsViewSet(viewsets.ModelViewSet):
    queryset=Posts.objects.all()
    serializer_class=PostsSerializer

    def get(self, request): 
        detail = [ {"name": detail.name,"detail": detail.detail}  
        for detail in Posts.objects.all()] 
        return Response(detail)

    def post(self,request,*args,**kwargs):
        post_type=request.data['post_type']
        title=request.data['title']
        description=request.data['description']
        date_posted=request.data['date_posted']
        username=request.data['username']['user_id']
        media=request.data['media']
        post=Posts.objects.create(post_type=post_type,
        title=title,description=description,
        date_posted=date_posted,username=username,
        media=media
        )
        return HttpResponse({'message':'Post created!'},status=200)

