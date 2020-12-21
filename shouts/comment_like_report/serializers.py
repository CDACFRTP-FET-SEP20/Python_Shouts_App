from rest_framework import serializers

from .models import User , HandsOn , Feedback

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'user_id',
            'emp_name',
            'emp_type',
            'emp_id',
            'emp_email',
        ]

class HandsOnSerializer(serializers.ModelSerializer):

    trainee = serializers.SlugRelatedField(
        queryset = User.objects.all(),
        many = True,
        slug_field = 'emp_name',
    )
    class Meta:
        model = HandsOn

        fields = [
            'handson_id',
            'languages',
            'handson_type',
            'handson_duration',
            'handson_status',
            'trainee'
        ]     

class FeedbackSerializer(serializers.ModelSerializer):

    feedback_mentor = serializers.SlugRelatedField(
        queryset = User.objects.all(),
        slug_field = 'emp_name'
    )

    feedback_trainee = serializers.SlugRelatedField(
        queryset = User.objects.all(),
        slug_field = 'emp_name'
    )

    class Meta:
        model = Feedback

        fields = [
            'feedback_id',
            'feedback_content',
            'feedback_mentor',
            'feedback_trainee'

        ]
