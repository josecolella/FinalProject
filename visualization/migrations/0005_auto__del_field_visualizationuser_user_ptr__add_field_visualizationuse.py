# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'VisualizationUser.user_ptr'
        db.delete_column('visualization_visualizationuser', 'user_ptr_id')

        # Adding field 'VisualizationUser.id'
        db.add_column('visualization_visualizationuser', 'id',
                      self.gf('django.db.models.fields.CharField')(db_index=True, default='', primary_key=True, max_length=256),
                      keep_default=False)

        # Adding field 'VisualizationUser.user'
        db.add_column('visualization_visualizationuser', 'user',
                      self.gf('django.db.models.fields.related.OneToOneField')(unique=True, to=orm['auth.User'], default=''),
                      keep_default=False)

        # Adding index on 'VisualizationUser', fields ['uploadedFiles']
        db.create_index('visualization_visualizationuser', ['uploadedFiles'])


    def backwards(self, orm):
        # Removing index on 'VisualizationUser', fields ['uploadedFiles']
        db.delete_index('visualization_visualizationuser', ['uploadedFiles'])

        # Adding field 'VisualizationUser.user_ptr'
        db.add_column('visualization_visualizationuser', 'user_ptr',
                      self.gf('django.db.models.fields.related.OneToOneField')(unique=True, to=orm['auth.User'], primary_key=True, default=''),
                      keep_default=False)

        # Deleting field 'VisualizationUser.id'
        db.delete_column('visualization_visualizationuser', 'id')

        # Deleting field 'VisualizationUser.user'
        db.delete_column('visualization_visualizationuser', 'user_id')


    models = {
        'auth.group': {
            'Meta': {'object_name': 'Group'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        'auth.permission': {
            'Meta': {'ordering': "('content_type__app_label', 'content_type__model', 'codename')", 'unique_together': "(('content_type', 'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Group']", 'symmetrical': 'False', 'related_name': "'user_set'", 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'related_name': "'user_set'", 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
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
            'image': ('django.db.models.fields.FilePathField', [], {'db_index': 'True', 'max_length': '100', 'blank': 'True'}),
            'link': ('django.db.models.fields.CharField', [], {'db_index': 'True', 'max_length': '50', 'blank': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'db_index': 'True', 'primary_key': 'True', 'max_length': '50'})
        },
        'visualization.visualizationuser': {
            'Meta': {'object_name': 'VisualizationUser'},
            'id': ('django.db.models.fields.CharField', [], {'db_index': 'True', 'default': "''", 'primary_key': 'True', 'max_length': '256'}),
            'uploadedFiles': ('jsonfield.fields.JSONField', [], {'db_index': 'True'}),
            'user': ('django.db.models.fields.related.OneToOneField', [], {'unique': 'True', 'to': "orm['auth.User']", 'default': "''"})
        }
    }

    complete_apps = ['visualization']