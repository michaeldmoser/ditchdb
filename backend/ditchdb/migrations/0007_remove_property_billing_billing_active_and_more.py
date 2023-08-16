# Generated by Django 4.2.1 on 2023-08-16 13:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ditchdb', '0006_billing_current_balance_alter_billing_content_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='property',
            name='billing',
        ),
        migrations.AddField(
            model_name='billing',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='billing',
            name='property',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='billing', to='ditchdb.property'),
        ),
    ]