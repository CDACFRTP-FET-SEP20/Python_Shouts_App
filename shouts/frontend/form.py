from django import forms
from posts.models import Posts

class NewPostForm(forms.ModelForm):
	class Meta:
		model = Posts
		fields = ['title','description', 'media']