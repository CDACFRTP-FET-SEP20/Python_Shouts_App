# Generated by Django 3.1.4 on 2021-01-02 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comment_like_report', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='shoutreport',
            name='report_type',
            field=models.CharField(max_length=256, null=True),
        ),
    ]
