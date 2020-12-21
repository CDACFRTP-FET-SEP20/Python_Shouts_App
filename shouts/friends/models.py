from django.db import models
from users.models import Profile
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.


class Friends(models.Model):
    sender = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name = 'Sender'
    )
    receiver =  models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name = 'Receiver'
    )
    is_friend = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'Friends'

    def __str__(self):
        return str(self.is_friend)
