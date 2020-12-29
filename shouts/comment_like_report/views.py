from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
from datetime import datetime
from .models import UserProfile, Shout,ShoutComment,ShoutLike,ShoutReport
from .serializers import UserSerializer , ShoutSerializer , LikeSerializer, CommentSerializer, ReportSerializer
from rest_framework import permissions
from rest_framework import viewsets
from django.http import HttpResponse
from rest_framework.response import Response

# Create your views here.
# def shout(request):
#     shouts = []
#     for shout in Shout.objects.all():
#         shouts.append({
#             'id':shout.id,
#             'desc':shout.desc,
#             'title':shout.title,
#             'date_stamp':shout.dateStamp,
#             'media':shout.media,
#         })


#     return render(request, '/comment_like_report/shout/',{'data':shouts})


# def shoutComment(request):
#     #return HttpResponse('<h1>Employee Page</h1>')
#     # return render(request, 'model_app/employee.html')
#     comments = []
#     for comment in ShoutComment.objects.all():
#         #_created_on= datetime.strftime(company.created_on,"%Y-%m-%d")
#         comments.append({
#             'c_id':comment.c_id,
#             'comment':comment.comment,
#             'dateStamp':comment.dateStamp
#         })


#     return render(request, '/comment_like_report/shoutcomment/',{'data':comments})

# def shoutLike(request):
#     likes = []
#     for like in ShoutLike.objects.all():
#         likes.append({
#             'l_id':like.l_id,
#             'u_id':like.u_id,
#             'p_id':like.p_id,
#         })


#     return render(request, '/comment_like_report/ShoutLike/',{'data':likes})

class UserViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class ShoutViewSet(viewsets.ModelViewSet):
    queryset = Shout.objects.all()
    serializer_class = ShoutSerializer
    # permission_classes = [permissions.IsAuthenticated]
    user = UserProfile.objects.all()


class LikeViewSet(viewsets.ModelViewSet):
    queryset = ShoutLike.objects.all()
    serializer_class = LikeSerializer

    def get(self, request): 
        likes = ShoutLike.objects.all().count() 
        return HttpResponse(likes)

    def delete(self,request, pk):
            unlike = Shout.objects.get(pk=id)
            if request.id == unlike.id:
                ShoutLike.objects.get(pk=id).delete()
            return Response({'message':'Unlike!'},status=200)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = ShoutComment.objects.all()
    serializer_class = CommentSerializer 

    def get(self, request): 
        comment = [ {"comment": comment.comment,"date": comment.date}  
        for comment in ShoutComment.objects.all()] 
        return Response(comment)

    def delete(self,request, pk):
            comment = Shout.objects.get(pk=id)
            if request.id == comment.id:
                ShoutComment.objects.get(pk=id).delete()
            return HttpResponse({'message':'Comment Deleted!'},status=200)


class ReportViewSet(viewsets.ModelViewSet):
    queryset = ShoutReport.objects.all()
    serializer_class = ReportSerializer   