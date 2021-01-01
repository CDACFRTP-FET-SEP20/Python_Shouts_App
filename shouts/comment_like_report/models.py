from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
import uuid
from datetime import datetime

# Create your models here.\
# class Shout(models.Model):
#     id = models.AutoField(primary_key=True)
#     desc = models.CharField(max_length=100)
#     type = models.CharField(max_length=20)
#     title = models.CharField(max_length=225)
#     dateStamp = models.DateTimeField(auto_now_add=True)
#     media = models.CharField(max_length=225)
#     u_id = models.ForeignKey(User, on_delete=models.CASCADE)
#     c_id = models.CharField(max_length=3)
#     l_id = models.CharField(max_length=3)
#     r_id = models.CharField(max_length=3)

#     def __str__(self):
#         return self.title + ' posted on ' + self.dateStamp

class UserProfile(models.Model):
    
    #type_list = [('AD','Trainer'),('TE','Trainee'),('MR','Mentor'),('HR','HR')]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=256, null=True) 
    user_email = models.EmailField(max_length=256)
    password = models.CharField(max_length=256, null=True)


    def __str__(self):
        return str(self.id)

class Shout(models.Model):
    
    type_list = [('TXT','Text'),('VDO','Video'),('ADO','Audio'),('IMG','Image')]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    desc = models.CharField(max_length=256, null=True) 
    type = models.CharField(max_length=20,choices=type_list,default='TXT')
    title = models.CharField(max_length=256, null=True) 
    media = models.CharField(max_length=256, null=True) 
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='Shout_User', default="",editable=False,null=True)
    #liked = models.ManyToManyField(UserProfile, related_name='Shout_Likes', default=None,blank=True, editable=False,null=True )


    def __str__(self):
        return str(self.id)

    # def num_likes(self):
    #     return self.liked.all().count()

class ShoutComment(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    shout_id = models.ForeignKey(Shout, on_delete=models.CASCADE, related_name='UserPost',default="", editable=False, null=True)
    comment = models.CharField(max_length=256,null=True)
    date = models.DateTimeField(default=datetime.now, editable=False)
    updated_at = models.DateTimeField(auto_now_add=True)
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='Comment_User', default="",editable=False,null=True)
    #name = models.CharField(max_length=255)

    def __str__(self):
        return str(self.id)

LIKE_CHOICES = (
    ('Like','Like'),
    ('Unlike','Unlike'),
)
class ShoutLike(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    shout_id = models.ForeignKey(Shout, on_delete=models.CASCADE, related_name='LikedPost',default="", editable=False, null=True)
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='Like_User', default="",editable=False,null=True)
    #value = models.CharField(choices=LIKE_CHOICES, default='Like',max_length=10)

    def __str__(self):
        return str(self.id)

class ShoutReport(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    shout_id = models.ForeignKey(Shout, on_delete=models.CASCADE, related_name='ReportedPost',default="", editable=False, null=True)
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='Report_User', default="",editable=False,null=True)
