# Generated by Django 3.1.4 on 2020-12-23 08:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0010_posts_date_posted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='date_posted',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]