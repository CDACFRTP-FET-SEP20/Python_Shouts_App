# Generated by Django 3.1.4 on 2020-12-24 05:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0018_auto_20201224_1050'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='date_posted',
            field=models.DateField(blank=True, null=True),
        ),
    ]
