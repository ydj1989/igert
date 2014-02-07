from django.db import models

# Create your models here.
class User(models.Model):
	user_name = models.CharField(max_length=16)
	password = models.CharField(max_length=16)
	
	def __unicode__(self):
		return self.user_name
