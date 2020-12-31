# from django.shortcuts import render
from .models import Profile
from .serializers import ProfileSerializer ,LoginSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from django.contrib.auth import login , logout
from rest_framework import views
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
import base64

# Create your views here.


class ProfileViewSets(viewsets.ModelViewSet):

    serializer_class = ProfileSerializer
    # parser_classes = (MultiPartJsonParsers, parsers.JSONParser)
    queryset = Profile.objects.all()
    

class LoginViewSets(views.APIView):

    def post(self, request):
        print(request.data)

        serializer = LoginSerializer(data=request.data)
        print("in views " , serializer)

        # if user is present it will not affect but if not request will not proceed
        # but response will be send back from here only
        serializer.is_valid(raise_exception=True)
        print("serializer.data",serializer.data)
        user = serializer.validated_data["user"]
        print("userType",type(user))
        print("Final " , user)
        login(request, user)


        # with open(user.user_image,'rb') as image_file:
        #     image_data = base64.b64encode(image_file.read()).decode('utf-8')

        image_data = base64.b64encode(user.user_image.read()).decode('utf-8')
        

        token = Token.objects.get(user=user)

        

        return Response({"token" : token.key, "user_id" : user.user_id , "username":user.username,"email":user.email,"user_image":image_data,"bio":user.bio}, status=200)
        # return Response({"token" : token.key, "user_id" : user.user_id }, status=200)



         



