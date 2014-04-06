# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'VisualizationModelDescription'
        db.create_table(u'visualization_visualizationmodeldescription', (
            ('title', self.gf('django.db.models.fields.CharField')(max_length=50, primary_key=True, db_index=True)),
            ('description', self.gf('django.db.models.fields.TextField')(max_length=350, db_index=True)),
            ('image', self.gf('django.db.models.fields.FilePathField')(db_index=True, max_length=100, blank=True)),
            ('link', self.gf('django.db.models.fields.URLField')(db_index=True, max_length=200, blank=True)),
        ))
        db.send_create_signal(u'visualization', ['VisualizationModelDescription'])


    def backwards(self, orm):
        # Deleting model 'VisualizationModelDescription'
        db.delete_table(u'visualization_visualizationmodeldescription')


    models = {
        u'visualization.visualizationmodeldescription': {
            'Meta': {'object_name': 'VisualizationModelDescription'},
            'description': ('django.db.models.fields.TextField', [], {'max_length': '350', 'db_index': 'True'}),
            'image': ('django.db.models.fields.FilePathField', [], {'db_index': 'True', 'max_length': '100', 'blank': 'True'}),
            'link': ('django.db.models.fields.URLField', [], {'db_index': 'True', 'max_length': '200', 'blank': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '50', 'primary_key': 'True', 'db_index': 'True'})
        }
    }

    complete_apps = ['visualization']