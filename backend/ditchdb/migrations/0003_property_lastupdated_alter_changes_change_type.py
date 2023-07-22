# Generated by Django 4.2.1 on 2023-07-21 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ditchdb', '0002_orionproperty_lastupdated'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='lastupdated',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='changes',
            name='change_type',
            field=models.CharField(blank=True, choices=[('new', 'New property added'), ('removed', 'Property was removed from orion database'), ('changed', 'Property details were changed in orion database'), ('ownership', 'Property ownership was changed in orion database'), ('address', 'Mailing address was changed in orion database')], default=None, max_length=255, null=True),
        ),
    ]
