# Generated by Django 3.2.9 on 2021-11-15 20:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fileManagement', '0008_alter_file_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='content',
            field=models.FileField(upload_to=''),
        ),
    ]
