from django.contrib import admin
from .models import Shout, ShoutComment, ShoutLike

# Register your models here.
admin.site.register((Shout, ShoutComment, ShoutLike))