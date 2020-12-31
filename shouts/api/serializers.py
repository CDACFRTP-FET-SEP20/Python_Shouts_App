from rest_framework import serializers
from accounts.models import Profile
from friends.models import Friends
from django.db.models import Q
from posts.models import Posts


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


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model=Profile
        
        friends=serializers.SlugRelatedField(
            queryset=Profile.objects.all(),
            many=True,
            slug_field='username',
        )
        fields="__all__"

    

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Posts
        
       
        fields="__all__"
            
    
    def to_representation(self, instance):
        rep = super(PostsSerializer, self).to_representation(instance)
        rep['username'] = instance.username.username
        return rep