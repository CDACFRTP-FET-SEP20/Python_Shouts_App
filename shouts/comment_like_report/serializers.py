from rest_framework import serializers
from datetime import datetime

from .models import UserProfile , Shout , ShoutComment , ShoutLike, ShoutReport

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserProfile
        fields = [
            'id',
            'username',
            'user_email',
            'password',
        ]


class ShoutSerializer(serializers.ModelSerializer):

    user_id = serializers.SlugRelatedField(
        queryset = UserProfile.objects.all(),
        many = True,
        slug_field = 'id',
    )

    # liked = serializers.SlugRelatedField(
    #     queryset = UserProfile.objects.all(),
    #     many = True,
    #     slug_field = 'id',
    # )

    class Meta:
        model = Shout
        fields = [
            'id',
            'desc',
            'type',
            'title',
            'media',
            'user_id'
        ]

class CommentSerializer(serializers.ModelSerializer):

    # date= datetime.strftime(ShoutComment.date,"%Y-%m-%d")
    shout_id = serializers.SlugRelatedField(
        queryset = Shout.objects.all(),
        # many = True,
        slug_field = 'id',
    )

    user_id = serializers.SlugRelatedField(
        queryset = UserProfile.objects.all(),
        # many = True,
        slug_field = 'id',
    )
    class Meta:
        model = ShoutComment

        fields = [
            'id',
            'shout_id',
            'comment',
            'date',
            'updated_at',
            'user_id',
        ]

class LikeSerializer(serializers.ModelSerializer):

    shout_id = serializers.SlugRelatedField(
        queryset = Shout.objects.all(),
        slug_field = 'id'
    )

    user_id = serializers.SlugRelatedField(
        queryset = UserProfile.objects.all(),
        slug_field = 'id',
    )

    class Meta:
        model = ShoutLike

        fields = [
            'id',
            'shout_id',
            'user_id',
        ]


class ReportSerializer(serializers.ModelSerializer):
    
    shout_id = serializers.SlugRelatedField(
        queryset = Shout.objects.all(),
        slug_field = 'id'
    )

    user_id = serializers.SlugRelatedField(
        queryset = UserProfile.objects.all(),
        slug_field = 'id',
    )

    class Meta:
        model = ShoutReport

        fields = [
            'id',
            'shout_id',
            'user_id',
            'report_type'
        ]
