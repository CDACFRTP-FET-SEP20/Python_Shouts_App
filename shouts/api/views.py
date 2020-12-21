from django.shortcuts import render
from rest_framework import viewsets,permissions
from .serializers import UsersSerializer,PostsSerializer
from users.models import Users
from posts.models import Posts
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


