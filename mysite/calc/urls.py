from django.conf.urls import patterns, url

from calc import views

urlpatterns = patterns('',
	url(r'^$', views.index, name='index'),
	url(r'^map/', views.map, name='map'),
	url(r'^login/', views.login, name='login'),
	url(r'^signup/', views.signup, name='signup')
)
