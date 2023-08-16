# Generated by Django 4.2.1 on 2023-08-14 21:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        ('ditchdb', '0003_alter_orionpartyaddr_defaultaddress'),
    ]

    operations = [
        migrations.CreateModel(
            name='Billing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address_to_line', models.CharField(blank=True, null=True)),
                ('attention_to_line', models.CharField(blank=True, null=True)),
                ('object_id', models.PositiveIntegerField()),
                ('street_address', models.CharField(blank=True, max_length=64, null=True)),
                ('country', models.CharField(blank=True, max_length=20, null=True)),
                ('city', models.CharField(blank=True, max_length=40, null=True)),
                ('state', models.CharField(blank=True, max_length=2, null=True)),
                ('zip', models.CharField(blank=True, max_length=50, null=True)),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype')),
            ],
        ),
    ]