# Generated by Django 3.2.9 on 2021-11-15 21:18

import django.core.files.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fileManagement', '0010_alter_file_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='content',
            field=models.ImageField(storage=django.core.files.storage.FileSystemStorage(base_url='/media/'), upload_to=''),
        ),
    ]
