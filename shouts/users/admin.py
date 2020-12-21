from django.contrib import admin
from users.models import Users
from posts.models import Posts,Likes,Comments
# Register your models here.
@admin.register(Posts)
class PostsAdmin(admin.ModelAdmin):
    list_display=['post_type','title','username']
    list_filter=['username']
    search_fields=['title']

@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display=['username','email']
    list_filter=['username']
    search_fields=['username']

@admin.register(Likes)
class LikesAdmin(admin.ModelAdmin):
    list_display=['user','post']
    list_filter=['post']
    search_fields=['post']

@admin.register(Comments)
class CommentsAdmin(admin.ModelAdmin):
    list_display=['username','post','comment']
    list_filter=['username']
    search_fields=['post']


