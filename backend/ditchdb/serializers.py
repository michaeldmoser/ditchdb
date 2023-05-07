# create OhdcPropertiesSerializer in backend/ditchdb/serializers.py
from rest_framework import serializers
from .models import Property, Contacts


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ('propertyid', 'geocode', 'addr_number', 'addr_predirectional', 'addr_street', 'addr_roadsuffix', 'addr_postdirectional', 'addr_city', 'addr_state',
                  'addr_zip', 'addr_unitnumber', 'addr_unittype', 'proptype', 'totmarket_acres', 'propcategory', 'propsubcategory', 'propsubcategory_desc', 'has_changes')


class ContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model: Contacts
        fields = ('id', 'first_name', 'last_name', 'email',
                  'phone', 'alternate_phone', 'notes')
