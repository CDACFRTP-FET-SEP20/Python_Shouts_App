from django.db import models
import uuid
from users.models import Users
from django.utils import timezone
# Create your models here.

class Posts(models.Model):
    TEXT = 'T'
    IMAGE = 'I'
    VIDEO = 'V'
    AUDIO = 'A'
    
    POST_TYPE = [
        (TEXT, 'Text'),
        (IMAGE, 'Image'),
        (VIDEO, 'Video'),
        (AUDIO, 'Audio'),
        
    ]
    
    post_id=models.UUIDField(primary_key=True,default=uuid.uuid4,editable = False)
    post_type = models.CharField(
        max_length=2,
        choices=POST_TYPE,
        default=TEXT,
    )
    title=models.CharField(max_length=500,default="",null=True)
    description=models.CharField(max_length=1000,default="",null=True,blank=True)
    date_posted = models.DateTimeField(default=timezone.now)
    username=models.ForeignKey(Users, on_delete=models.CASCADE)
    media=models.FileField(upload_to='media/post',default="",null=True,blank=True)
    

    def __str__(self):
        return self.title


class Likes(models.Model):
    like_id=models.UUIDField(primary_key=True,default=uuid.uuid4,editable = False)
    user=models.ForeignKey(Users,related_name='likes', on_delete=models.CASCADE)
    post = models.ForeignKey(Posts, related_name='likes', on_delete=models.CASCADE)

class Comments(models.Model):
	post = models.ForeignKey(Posts, related_name='details', on_delete=models.CASCADE)
	username = models.ForeignKey(Users, related_name='details', on_delete=models.CASCADE)
	comment = models.CharField(max_length=255)
	comment_date = models.DateTimeField(default=timezone.now)