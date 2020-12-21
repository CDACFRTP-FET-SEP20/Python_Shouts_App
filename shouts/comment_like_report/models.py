from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

# Create your models here.\
class Shout(models.Model):
    id = models.AutoField(primary_key=True)
    desc = models.CharField(max_length=100)
    type = models.CharField(max_length=20)
    title = models.CharField(max_length=225)
    dateStamp = models.DateTimeField(auto_now_add=True)
    media = models.CharField(max_length=225)
    u_id = models.ForeignKey(User, on_delete=models.CASCADE)
    c_id = models.CharField(max_length=3)
    l_id = models.CharField(max_length=3)
    r_id = models.CharField(max_length=3)

    def __str__(self):
        return self.title + ' posted on ' + self.dateStamp

class ShoutComment(models.Model):
    c_id = models.AutoField(primary_key=True)
    comment = models.TextField()
    u_id = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Shout, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
    dateStamp = models.DateTimeField(default=now)

    def __str__(self):
        return self.comment + ' posted on ' + self.dateStamp


class ShoutLike(models.Model):
    l_id = models.AutoField(primary_key=True)
    u_id = models.ForeignKey(User, on_delete=models.CASCADE)
    p_id = models.ForeignKey(Shout, on_delete=models.CASCADE)

    def __str__(self):
        return self.l_id