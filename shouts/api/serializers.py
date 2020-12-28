from rest_framework import serializers,fields
from users.models import Users
from posts.models import Posts,Likes,Comments

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model=Users
        
        friends=serializers.SlugRelatedField(
            queryset=Users.objects.all(),
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
