# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'VisualizationModelDescription'
        db.create_table('visualization_visualizationmodeldescription', (
            ('title', self.gf('django.db.models.fields.CharField')(max_length=50, db_index=True, primary_key=True)),
            ('description', self.gf('django.db.models.fields.TextField')(max_length=350, db_index=True)),
            ('image', self.gf('django.db.models.fields.FilePathField')(max_length=100, db_index=True, blank=True)),
            ('link', self.gf('django.db.models.fields.CharField')(max_length=50, db_index=True, blank=True)),
        ))
        db.send_create_signal('visualization', ['VisualizationModelDescription'])

        # Adding model 'UploadFile'
        db.create_table('visualization_uploadfile', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('file', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
        ))
        db.send_create_signal('visualization', ['UploadFile'])


    def backwards(self, orm):
        # Deleting model 'VisualizationModelDescription'
        db.delete_table('visualization_visualizationmodeldescription')

        # Deleting model 'UploadFile'
        db.delete_table('visualization_uploadfile')


    models = {
        'visualization.uploadfile': {
            'Meta': {'object_name': 'UploadFile'},
            'file': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        'visualization.visualizationmodeldescription': {
            'Meta': {'object_name': 'VisualizationModelDescription'},
            'description': ('django.db.models.fields.TextField', [], {'max_length': '350', 'db_index': 'True'}),
            'image': ('django.db.models.fields.FilePathField', [], {'max_length': '100', 'db_index': 'True', 'blank': 'True'}),
            'link': ('django.db.models.fields.CharField', [], {'max_length': '50', 'db_index': 'True', 'blank': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '50', 'db_index': 'True', 'primary_key': 'True'})
        }
    }

    complete_apps = ['visualization']