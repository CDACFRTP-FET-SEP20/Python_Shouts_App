from django.db import models
# from django.contrib.auth.models import User
# Create your models here.


class Profile(models.Model):

    bio = models.CharField(max_length=256)
    username = models.CharField(max_length=256, unique=True)

    def __str__(self):
        return self.username
