from django.db import models
import uuid
from accounts.models import Profile
from django.utils import timezone
from datetime import datetime,date
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
    description=models.CharField(max_length=1000,default="",null=True)
    date_posted = models.DateTimeField(blank=True,null=True,default=timezone.now)
    username=models.ForeignKey(Profile, on_delete=models.CASCADE,related_name="author")
    media=models.FileField(upload_to='media/post',default="",null=True,blank=True)
    

    def __str__(self):
        return str(self.title)
