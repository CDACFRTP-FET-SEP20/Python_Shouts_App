# Generated by Django 3.1.4 on 2020-12-21 11:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0007_auto_20201221_1413'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='media',
            field=models.FileField(blank=True, default='', null=True, upload_to='media/<django.db.models.fields.related.ForeignKey>/post'),
        ),
    ]
