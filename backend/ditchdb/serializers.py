# create OhdcPropertiesSerializer in backend/ditchdb/serializers.py
from rest_framework import serializers
from .models import OhdcProperty


class OhdcPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = OhdcProperty
        fields = ('propertyid', 'geocode', 'addr_number', 'addr_predirectional', 'addr_street', 'addr_roadsuffix', 'addr_postdirectional', 'addr_city', 'addr_state',
                  'addr_zip', 'addr_unitnumber', 'addr_unittype', 'proptype', 'totmarket_acres', 'propcategory', 'propsubcategory', 'propsubcategory_desc', 'has_changes')
