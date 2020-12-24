from django.contrib import admin
from .models import UserProfile,Shout, ShoutComment, ShoutLike, ShoutReport

# Register your models here.
# admin.site.register((Shout, ShoutComment, ShoutLike))

@admin.register(UserProfile)
class UserAdmin(admin.ModelAdmin):
    list_display = ["id", "username", "user_email", "password"]
    search_fields = ["username"]

@admin.register(Shout)
class ShoutAdmin(admin.ModelAdmin):
    list_display = ["id", "desc", "type", "title", "media","user_id"]
    search_fields = ["type"]

@admin.register(ShoutComment)
class ShoutCommentAdmin(admin.ModelAdmin):
    list_display = ["id", "shout_id","comment","date","updated_at","user_id"]
    # list_filter = ["date"]
    # autocomplete_fields = ["trainee"]
    


@admin.register(ShoutLike)
class ShoutLikeAdmin(admin.ModelAdmin):
    list_display = ["id", "shout_id","user_id"]


@admin.register(ShoutReport)
class ShoutReportAdmin(admin.ModelAdmin):
    list_display = ["id", "shout_id","user_id"]

# @admin.register(TraineeUserMapping)
# class TraineeUserMappingAdmin(admin.ModelAdmin):

#     list_display = ["traineeuser_id"]
#     list_filter = ["traineeuser_id"]