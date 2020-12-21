from django.db import models
import uuid
# Create your models here.
class Users(models.Model):
    user_id=models.UUIDField(primary_key=True,default=uuid.uuid4,editable = False)
    username=models.CharField(max_length=50)
    password=models.CharField(max_length=20)
    email=models.EmailField(unique=True)
    profile_pic=models.ImageField(upload_to='media/profile/',default="",blank=True)
    bio=models.CharField(max_length=500,null=True,default="")
    friends=models.ManyToManyField("Users",blank=True)

    def __str__(self):
        return self.username

