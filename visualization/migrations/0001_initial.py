# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'VisualizationModelDescription'
        db.create_table('visualization_visualizationmodeldescription', (
            ('title', self.gf('django.db.models.fields.CharField')(db_index=True, max_length=50, primary_key=True)),
            ('description', self.gf('django.db.models.fields.TextField')(db_index=True, max_length=350)),
            ('image', self.gf('django.db.models.fields.FilePathField')(blank=True, db_index=True, max_length=100)),
            ('link', self.gf('django.db.models.fields.CharField')(blank=True, db_index=True, max_length=20)),
        ))
        db.send_create_signal('visualization', ['VisualizationModelDescription'])

        # Adding model 'UploadFile'
        db.create_table('visualization_uploadfile', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('file', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
        ))
        db.send_create_signal('visualization', ['UploadFile'])

        # Adding model 'Description'
        db.create_table('visualization_description', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('description', self.gf('django.db.models.fields.TextField')(db_index=True, max_length=200)),
        ))
        db.send_create_signal('visualization', ['Description'])

        # Adding model 'ProjectDescription'
        db.create_table('visualization_projectdescription', (
            ('description_ptr', self.gf('django.db.models.fields.related.OneToOneField')(unique=True, to=orm['visualization.Description'], primary_key=True)),
            ('title', self.gf('django.db.models.fields.CharField')(db_index=True, max_length=50)),
        ))
        db.send_create_signal('visualization', ['ProjectDescription'])

        # Adding model 'JavaScriptDescription'
        db.create_table('visualization_javascriptdescription', (
            ('description_ptr', self.gf('django.db.models.fields.related.OneToOneField')(unique=True, to=orm['visualization.Description'], primary_key=True)),
            ('pathToImage', self.gf('django.db.models.fields.CharField')(max_length=50)),
        ))
        db.send_create_signal('visualization', ['JavaScriptDescription'])

        # Adding model 'PythonDescription'
        db.create_table('visualization_pythondescription', (
            ('description_ptr', self.gf('django.db.models.fields.related.OneToOneField')(unique=True, to=orm['visualization.Description'], primary_key=True)),
            ('pathToImage', self.gf('django.db.models.fields.CharField')(max_length=50)),
        ))
        db.send_create_signal('visualization', ['PythonDescription'])

        # Adding model 'RDescription'
        db.create_table('visualization_rdescription', (
            ('description_ptr', self.gf('django.db.models.fields.related.OneToOneField')(unique=True, to=orm['visualization.Description'], primary_key=True)),
            ('pathToImage', self.gf('django.db.models.fields.CharField')(max_length=50)),
        ))
        db.send_create_signal('visualization', ['RDescription'])


    def backwards(self, orm):
        # Deleting model 'VisualizationModelDescription'
        db.delete_table('visualization_visualizationmodeldescription')

        # Deleting model 'UploadFile'
        db.delete_table('visualization_uploadfile')

        # Deleting model 'Description'
        db.delete_table('visualization_description')

        # Deleting model 'ProjectDescription'
        db.delete_table('visualization_projectdescription')

        # Deleting model 'JavaScriptDescription'
        db.delete_table('visualization_javascriptdescription')

        # Deleting model 'PythonDescription'
        db.delete_table('visualization_pythondescription')

        # Deleting model 'RDescription'
        db.delete_table('visualization_rdescription')


    models = {
        'visualization.description': {
            'Meta': {'object_name': 'Description'},
            'description': ('django.db.models.fields.TextField', [], {'db_index': 'True', 'max_length': '200'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        'visualization.javascriptdescription': {
            'Meta': {'object_name': 'JavaScriptDescription', '_ormbases': ['visualization.Description']},
            'description_ptr': ('django.db.models.fields.related.OneToOneField', [], {'unique': 'True', 'to': "orm['visualization.Description']", 'primary_key': 'True'}),
            'pathToImage': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'visualization.projectdescription': {
            'Meta': {'object_name': 'ProjectDescription', '_ormbases': ['visualization.Description']},
            'description_ptr': ('django.db.models.fields.related.OneToOneField', [], {'unique': 'True', 'to': "orm['visualization.Description']", 'primary_key': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'db_index': 'True', 'max_length': '50'})
        },
        'visualization.pythondescription': {
            'Meta': {'object_name': 'PythonDescription', '_ormbases': ['visualization.Description']},
            'description_ptr': ('django.db.models.fields.related.OneToOneField', [], {'unique': 'True', 'to': "orm['visualization.Description']", 'primary_key': 'True'}),
            'pathToImage': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'visualization.rdescription': {
            'Meta': {'object_name': 'RDescription', '_ormbases': ['visualization.Description']},
            'description_ptr': ('django.db.models.fields.related.OneToOneField', [], {'unique': 'True', 'to': "orm['visualization.Description']", 'primary_key': 'True'}),
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
            'link': ('django.db.models.fields.CharField', [], {'blank': 'True', 'db_index': 'True', 'max_length': '20'}),
            'title': ('django.db.models.fields.CharField', [], {'db_index': 'True', 'max_length': '50', 'primary_key': 'True'})
        }
    }

    complete_apps = ['visualization']