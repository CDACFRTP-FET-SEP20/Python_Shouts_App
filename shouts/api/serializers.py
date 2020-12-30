from rest_framework import serializers
from accounts.models import Profile
from friends.models import Friends
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
            'is_friend',
        ]


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = '__all__'


