from rest_framework import serializers
from users.models import Profile
from friends.models import Friends
# from django.contrib.auth.models import User
from django.db.models import Q


class FriendsSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(
        queryset=Profile.objects.all(),
        slug_field='username'

    )
    receiver = serializers.SlugRelatedField(
        queryset=Profile.objects.all(),
        slug_field='username'

    )

    class Meta:
        model = Friends
        fields = [
            'id',
            'sender',
            'receiver',
            'is_friend'
        ]


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = [
            'id',
            'bio',
            'username'
        ]


# class FriendRequestSendSerializer(serializers.ModelSerializer):
#     def __init__(self, username):
#         self.username = username

#     myself = User.objects.get(username = self.username).id

#     user = serializers.SlugRelatedField(
#         queryset=User.objects.filter(~Q(id = myself)),
#         slug_field='username',
#     )

#     class Meta:
#         model = Profile
#         fields = [
#             'id',
#             'user'
#         ]
