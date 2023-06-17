# Generated by Django 4.2.1 on 2023-06-17 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    replaces = [('ditchdb', '0001_initial'), ('ditchdb', '0002_alter_property_options'), ('ditchdb', '0003_property_contact_owners_property_organization_owners'), ('ditchdb', '0004_propertyownership'), ('ditchdb', '0005_delete_propertyownership')]

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='OhdcOwner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('propertyid', models.IntegerField()),
                ('partyid', models.IntegerField()),
                ('primaryowner', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'ohdc_owner',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='OhdcPartyaddr',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('partyid', models.IntegerField()),
                ('defaultaddress', models.BooleanField(default=False)),
                ('address1', models.CharField(blank=True, max_length=64, null=True)),
                ('address2', models.CharField(blank=True, max_length=64, null=True)),
                ('address3', models.CharField(blank=True, max_length=64, null=True)),
                ('country', models.CharField(blank=True, max_length=20, null=True)),
                ('postalcode', models.CharField(blank=True, max_length=20, null=True)),
                ('city', models.CharField(blank=True, max_length=40, null=True)),
                ('state', models.CharField(blank=True, max_length=2, null=True)),
                ('zip', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'ohdc_partyaddr',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='OhdcPartyname',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('partyid', models.IntegerField()),
                ('defaultname', models.BooleanField(default=False)),
                ('fullname', models.CharField(blank=True, max_length=167, null=True)),
                ('nametype', models.IntegerField(blank=True, null=True)),
                ('nametype_desc', models.CharField(blank=True, max_length=60, null=True)),
            ],
            options={
                'db_table': 'ohdc_partyname',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Contacts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=30, null=True)),
                ('last_name', models.CharField(blank=True, max_length=30, null=True)),
                ('email', models.CharField(blank=True, max_length=320, null=True)),
                ('phone', models.CharField(blank=True, max_length=20, null=True)),
                ('alternate_phone', models.CharField(blank=True, null=True)),
                ('notes', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'contacts',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Organizations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('phone', models.CharField(blank=True, max_length=20, null=True)),
                ('notes', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'organizations',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('geocode', models.CharField(blank=True, max_length=60, null=True)),
                ('addr_number', models.CharField(blank=True, max_length=20, null=True)),
                ('addr_predirectional', models.CharField(blank=True, max_length=5, null=True)),
                ('addr_street', models.CharField(blank=True, max_length=64, null=True)),
                ('addr_roadsuffix', models.CharField(blank=True, max_length=5, null=True)),
                ('addr_postdirectional', models.CharField(blank=True, max_length=5, null=True)),
                ('addr_city', models.CharField(blank=True, max_length=40, null=True)),
                ('addr_state', models.CharField(blank=True, null=True)),
                ('addr_zip', models.CharField(blank=True, max_length=10, null=True)),
                ('addr_unitnumber', models.CharField(blank=True, max_length=20, null=True)),
                ('addr_unittype', models.CharField(blank=True, max_length=5, null=True)),
                ('proptype', models.CharField(blank=True, max_length=60, null=True)),
                ('totmarket_acres', models.DecimalField(blank=True, decimal_places=6, max_digits=21, null=True)),
                ('propcategory', models.CharField(blank=True, max_length=5, null=True)),
                ('propsubcategory', models.CharField(blank=True, max_length=20, null=True)),
                ('propsubcategory_desc', models.CharField(blank=True, max_length=60, null=True)),
                ('has_changes', models.BooleanField()),
                ('contact_owners', models.ManyToManyField(blank=True, related_name='owns', to='ditchdb.contacts')),
                ('organization_owners', models.ManyToManyField(blank=True, related_name='owns', to='ditchdb.organizations')),
            ],
            options={
                'db_table': 'ohdc_property',
                'managed': True,
            },
        ),
    ]