# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'VisualizationModelDescription'
        db.create_table('visualization_visualizationmodeldescription', (
            ('title', self.gf('django.db.models.fields.CharField')(max_length=50, primary_key=True, db_index=True)),
            ('description', self.gf('django.db.models.fields.TextField')(max_length=350, db_index=True)),
            ('image', self.gf('django.db.models.fields.FilePathField')(max_length=100, blank=True, db_index=True)),
        ))
        db.send_create_signal('visualization', ['VisualizationModelDescription'])


    def backwards(self, orm):
        # Deleting model 'VisualizationModelDescription'
        db.delete_table('visualization_visualizationmodeldescription')


    models = {
        'visualization.visualizationmodeldescription': {
            'Meta': {'object_name': 'VisualizationModelDescription'},
            'description': ('django.db.models.fields.TextField', [], {'max_length': '350', 'db_index': 'True'}),
            'image': ('django.db.models.fields.FilePathField', [], {'max_length': '100', 'blank': 'True', 'db_index': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '50', 'primary_key': 'True', 'db_index': 'True'})
        }
    }

    complete_apps = ['visualization']