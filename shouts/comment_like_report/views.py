from django.shortcuts import render
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
from datetime import datetime
from .models import Shout,ShoutComment,ShoutLike

# Create your views here.
def shout(request):
    shouts = []
    for shout in Shout.objects.all():
        shouts.append({
            'id':shout.id,
            'desc':shout.desc,
            'title':shout.title,
            'date_stamp':shout.dateStamp,
            'media':shout.media,
        })


    return render(request, '/comment_like_report/shout/',{'data':shouts})


def shoutComment(request):
    #return HttpResponse('<h1>Employee Page</h1>')
    # return render(request, 'model_app/employee.html')
    comments = []
    for comment in ShoutComment.objects.all():
        #_created_on= datetime.strftime(company.created_on,"%Y-%m-%d")
        comments.append({
            'c_id':comment.c_id,
            'comment':comment.comment,
            'dateStamp':comment.dateStamp
        })


    return render(request, '/comment_like_report/shoutcomment/',{'data':comments})

def shoutLike(request):
    likes = []
    for like in ShoutLike.objects.all():
        likes.append({
            'l_id':like.l_id,
            'u_id':like.u_id,
            'p_id':like.p_id,
        })


    return render(request, '/comment_like_report/ShoutLike/',{'data':likes})