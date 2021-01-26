from django.shortcuts import render

# Create your views here.

posts = [
    {
        'author':'Zeeshan Ahmed',
        'title':'Blog Post 1',
        'content': 'First blog post',
        'date_posted': 'Jan 26, 2021'
    },
    {
        'author':'Jane Doe',
        'title':'Blog Post 2',
        'content': 'Second blog post',
        'date_posted': 'Jan 25, 2021'
    }
]

def home(request):
    context = {
        'posts': posts
    }
    return render(request, 'blog/home.html', context)

def about(request):
    return render(request, 'blog/about.html', {'title': 'About'})