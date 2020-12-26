from django.shortcuts import render
from rest_framework import viewsets,permissions
from .serializers import UsersSerializer,PostsSerializer
from users.models import Users
from posts.models import Posts
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.decorators import api_view



# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset=Users.objects.all().order_by('username')
    serializer_class=UsersSerializer

class MyPostsViewSet(viewsets.ModelViewSet):
    print("mypost")
    queryset=Posts.objects.filter(username="21972bf4-f2c5-4658-b08a-6378034f8ee1")
    serializer_class=PostsSerializer

class PostsViewSet(viewsets.ModelViewSet):
    queryset=Posts.objects.all()
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
            post = Post.objects.get(pk=post_id)
            if request.user== post.username:
                Post.objects.get(pk=post_id).delete()
            return HttpResponse({'message':'Post deleted!'},status=200)

