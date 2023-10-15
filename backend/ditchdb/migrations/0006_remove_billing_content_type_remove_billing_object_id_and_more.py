# Generated by Django 4.2.1 on 2023-10-01 12:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ditchdb', '0005_alter_billing_content_type_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='billing',
            name='content_type',
        ),
        migrations.RemoveField(
            model_name='billing',
            name='object_id',
        ),
        migrations.AddField(
            model_name='billing',
            name='organization',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ditchdb.organization'),
        ),
        migrations.AddField(
            model_name='billing',
            name='person',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ditchdb.person'),
        ),
        migrations.AddConstraint(
            model_name='billing',
            constraint=models.CheckConstraint(check=models.Q(models.Q(('organization__isnull', True), ('person__isnull', False)), models.Q(('organization__isnull', False), ('person__isnull', True)), models.Q(('organization__isnull', True), ('person__isnull', True)), _connector='OR'), name='either_person_or_organization_or_neither'),
        ),
    ]