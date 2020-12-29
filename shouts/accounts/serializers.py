from rest_framework import serializers , exceptions
from .models import Profile
from django.contrib.auth import authenticate
from django.contrib.auth.backends import UserModel


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model  = Profile

        fields = '__all__' 

    

class LoginSerializer(serializers.Serializer):

    email = serializers.CharField()
    password = serializers.CharField()

    print(UserModel)

    def validate(self, data):
        email = data.get("email", "")
        password = data.get("password", "")
        
        if email and password : 
            
            user = UserModel.objects.get(email=email, password=password)

            if user:
                if user.is_active:
                    data["user"] = user                   

                else:
                    msg = "User is deactivated"
                    raise exceptions.ValidationError(msg)

            else:
                data["user"] = None
                msg = "Given Credentials are wrong"
                raise exceptions.ValidationError(msg)

        else:
            msg = "Please Provide email and password"
            raise exceptions.ValidationError(msg)

        return data

