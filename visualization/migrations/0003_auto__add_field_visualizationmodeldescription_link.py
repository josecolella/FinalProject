# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'VisualizationModelDescription.link'
        db.add_column('visualization_visualizationmodeldescription', 'link',
                      self.gf('django.db.models.fields.CharField')(db_index=True, default='', blank=True, max_length=20),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'VisualizationModelDescription.link'
        db.delete_column('visualization_visualizationmodeldescription', 'link')


    models = {
        'visualization.visualizationmodeldescription': {
            'Meta': {'object_name': 'VisualizationModelDescription'},
            'description': ('django.db.models.fields.TextField', [], {'db_index': 'True', 'max_length': '350'}),
            'image': ('django.db.models.fields.FilePathField', [], {'db_index': 'True', 'blank': 'True', 'max_length': '100'}),
            'link': ('django.db.models.fields.CharField', [], {'db_index': 'True', 'blank': 'True', 'max_length': '20'}),
            'title': ('django.db.models.fields.CharField', [], {'primary_key': 'True', 'db_index': 'True', 'max_length': '50'})
        }
    }

    complete_apps = ['visualization']