"""Serializers for the ditchdb app."""
from rest_framework import serializers
from .models import Property, Contacts, Organizations


class PropertySerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""
    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Property
        fields = (
            'id', 'geocode', 'addr_number', 'addr_predirectional',
            'addr_street', 'addr_roadsuffix', 'addr_postdirectional',
            'addr_city', 'addr_state', 'addr_zip', 'addr_unitnumber',
            'addr_unittype', 'proptype', 'totmarket_acres', 'propcategory',
            'propsubcategory', 'propsubcategory_desc', 'has_changes')


class ContactSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""
    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Contacts
        fields = ('id', 'first_name', 'last_name', 'email',
                  'phone', 'alternate_phone', 'notes')


class OrganizationSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""
    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Organizations
        fields = ('id', 'name', 'phone', 'notes')
