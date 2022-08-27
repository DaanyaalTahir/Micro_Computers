# Generated by Django 4.0.3 on 2022-03-31 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mc_site', '0002_rename_decription_item_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='item_price',
            field=models.DecimalField(decimal_places=2, default=1.1, max_digits=10),
            preserve_default=False,
        ),
    ]
