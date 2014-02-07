from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):

	def forwards(self, orm):
		
		# Adding model 'User'
		db.create_table('calc_user', (			
			('id', self.gf('django.db.models.fields.AutoField') (primary_key=True)),
			('user_name', self.gf('django.db.models.fields.CharField') (max_length=16)),
			('password', self.gf('django.db.models.fields.CharField') (max_length=16)),
		))
		db.send_create_signal('calc', ['User'])





