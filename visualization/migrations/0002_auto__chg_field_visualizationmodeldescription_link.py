# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):

        # Changing field 'VisualizationModelDescription.link'
        db.alter_column('visualization_visualizationmodeldescription', 'link', self.gf('django.db.models.fields.CharField')(max_length=50))

    def backwards(self, orm):

        # Changing field 'VisualizationModelDescription.link'
        db.alter_column('visualization_visualizationmodeldescription', 'link', self.gf('django.db.models.fields.CharField')(max_length=20))

    models = {
        'visualization.description': {
            'Meta': {'object_name': 'Description'},
            'description': ('django.db.models.fields.TextField', [], {'db_index': 'True', 'max_length': '200'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        'visualization.javascriptdescription': {
            'Meta': {'_ormbases': ['visualization.Description'], 'object_name': 'JavaScriptDescription'},
            'description_ptr': ('django.db.models.fields.related.OneToOneField', [], {'unique': 'True', 'primary_key': 'True', 'to': "orm['visualization.Description']"}),
            'pathToImage': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'visualization.projectdescription': {
            'Meta': {'_ormbases': ['visualization.Description'], 'object_name': 'ProjectDescription'},
            'description_ptr': ('django.db.models.fields.related.OneToOneField', [], {'unique': 'True', 'primary_key': 'True', 'to': "orm['visualization.Description']"}),
            'title': ('django.db.models.fields.CharField', [], {'db_index': 'True', 'max_length': '50'})
        },
        'visualization.pythondescription': {
            'Meta': {'_ormbases': ['visualization.Description'], 'object_name': 'PythonDescription'},
            'description_ptr': ('django.db.models.fields.related.OneToOneField', [], {'unique': 'True', 'primary_key': 'True', 'to': "orm['visualization.Description']"}),
            'pathToImage': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'visualization.rdescription': {
            'Meta': {'_ormbases': ['visualization.Description'], 'object_name': 'RDescription'},
            'description_ptr': ('django.db.models.fields.related.OneToOneField', [], {'unique': 'True', 'primary_key': 'True', 'to': "orm['visualization.Description']"}),
            'pathToImage': ('django.db.models.fields.CharField', [], {'max_length': '50'})
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
            'title': ('django.db.models.fields.CharField', [], {'db_index': 'True', 'primary_key': 'True', 'max_length': '50'})
        }
    }

    complete_apps = ['visualization']