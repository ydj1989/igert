from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader, Context

# Create your views here.

def index(request):
	template = loader.get_template('calc/index.html')
	html = template.render(Context({}))
	return HttpResponse(html)

def map(request):
	template = loader.get_template('calc/map.html')
	html = template.render(Context({}))
	return HttpResponse(html)

def login(request):
	template = loader.get_template('calc/login.htm')
	html = template.render(Context({}))
	return HttpResponse(html)

def signup(request):
	template = loader.get_template('calc/signup.htm')
	html = template.render(Context({}))
	return HttpResponse(html)
