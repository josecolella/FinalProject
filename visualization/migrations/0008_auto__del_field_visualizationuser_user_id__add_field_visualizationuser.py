# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'VisualizationUser.user_id'
        db.delete_column('visualization_visualizationuser', 'user_id')

        # Adding field 'VisualizationUser.id'
        db.add_column('visualization_visualizationuser', 'id',
                      self.gf('django.db.models.fields.AutoField')(primary_key=True, default=1234567),
                      keep_default=False)


        # Changing field 'VisualizationUser.user'
        db.alter_column('visualization_visualizationuser', 'user_id', self.gf('django.db.models.fields.related.OneToOneField')(unique=True, to=orm['auth.User']))

    def backwards(self, orm):
        # Adding field 'VisualizationUser.user_id'
        db.add_column('visualization_visualizationuser', 'user_id',
                      self.gf('django.db.models.fields.IntegerField')(primary_key=True, db_index=True, max_length=256, default=35),
                      keep_default=False)

        # Deleting field 'VisualizationUser.id'
        db.delete_column('visualization_visualizationuser', 'id')


        # Changing field 'VisualizationUser.user'
        db.alter_column('visualization_visualizationuser', 'user_id', self.gf('django.db.models.fields.related.OneToOneField')(primary_key=True, to=orm['auth.User'], unique=True))

    models = {
        'auth.group': {
            'Meta': {'object_name': 'Group'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'to': "orm['auth.Permission']", 'symmetrical': 'False'})
        },
        'auth.permission': {
            'Meta': {'object_name': 'Permission', 'ordering': "('content_type__app_label', 'content_type__model', 'codename')", 'unique_together': "(('content_type', 'codename'),)"},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'blank': 'True', 'max_length': '75'}),
            'first_name': ('django.db.models.fields.CharField', [], {'blank': 'True', 'max_length': '30'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'to': "orm['auth.Group']", 'related_name': "'user_set'", 'symmetrical': 'False'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'blank': 'True', 'max_length': '30'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'to': "orm['auth.Permission']", 'related_name': "'user_set'", 'symmetrical': 'False'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        'contenttypes.contenttype': {
            'Meta': {'object_name': 'ContentType', 'ordering': "('name',)", 'db_table': "'django_content_type'", 'unique_together': "(('app_label', 'model'),)"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        'visualization.uploadfile': {
            'Meta': {'object_name': 'UploadFile'},
            'file': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        'visualization.visualizationmodeldescription': {
            'Meta': {'object_name': 'VisualizationModelDescription'},
            'description': ('django.db.models.fields.TextField', [], {'db_index': 'True', 'max_length': '350'}),
            'image': ('django.db.models.fields.FilePathField', [], {'blank': 'True', 'db_index': 'True', 'max_length': '100'}),
            'link': ('django.db.models.fields.CharField', [], {'blank': 'True', 'db_index': 'True', 'max_length': '50'}),
            'title': ('django.db.models.fields.CharField', [], {'primary_key': 'True', 'db_index': 'True', 'max_length': '50'})
        },
        'visualization.visualizationuser': {
            'Meta': {'object_name': 'VisualizationUser'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'uploadedFiles': ('jsonfield.fields.JSONField', [], {'blank': 'True', 'db_index': 'True'}),
            'user': ('django.db.models.fields.related.OneToOneField', [], {'unique': 'True', 'to': "orm['auth.User']"})
        }
    }

    complete_apps = ['visualization']