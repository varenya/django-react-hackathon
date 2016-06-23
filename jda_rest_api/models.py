# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class Language(models.Model):
    language = models.CharField(max_length=15)
    icon = models.TextField()

    class Meta:
        managed = False
        db_table = 'language'


class Submissions(models.Model):
    submission_id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=45)
    metadata = models.TextField()
    source = models.CharField(max_length=20000)
    status = models.CharField(max_length=45)
    language = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'submissions'
