from django.shortcuts import render
from django.views.generic import TemplateView
from .form import NewPostForm
from django.contrib import messages
# Create your views here.
class AppView(TemplateView):
    template_name = 'frontend/index.html'

    # In a class-based view, the `path` variable from the url
    #  will be passed in the **kwargs to all methods.
    def get_context_data(self, **kwargs):
            return {'context_variable': 'value'}


    def create_post(request):
        user = request.user
        if request.method == "POST":
            form = NewPostForm(request.POST, request.FILES)
            if form.is_valid():
                data = form.save(commit=False)
                data.username = user
                data.save()
                messages.success(request, f'Posted Successfully')
                return redirect('app')
        else:
            form = NewPostForm()
        return render(request, 'app/create-shout', {'form':form})
