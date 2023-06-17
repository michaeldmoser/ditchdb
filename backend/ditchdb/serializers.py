"""Serializers for the ditchdb app."""
from rest_framework import serializers
from .models import Property, Contacts, Organizations


class PropertySerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    owners = serializers.SerializerMethodField()

    def get_owners(self, obj):
        """Return a list of owners whether an organization or an individual."""
        def serialize(model):
            """Set the model type."""
            if isinstance(model, Contacts):
                owner = ContactSerializer(model).data
                owner['type'] = 'contact'
            else:
                owner = OrganizationSerializer(model).data
                owner['type'] = 'organization'

            return owner

        return [serialize(owner) for owner in obj.owners]

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Property
        fields = (
            'id', 'geocode', 'addr_number', 'addr_predirectional',
            'addr_street', 'addr_roadsuffix', 'addr_postdirectional',
            'addr_city', 'addr_state', 'addr_zip', 'addr_unitnumber',
            'addr_unittype', 'proptype', 'totmarket_acres', 'propcategory',
            'propsubcategory', 'propsubcategory_desc', 'has_changes', 'owners')


class ContactSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""
    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Contacts
        fields = ('id', 'first_name', 'last_name', 'email',
                  'phone', 'alternate_phone', 'notes',)


class OrganizationSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""
    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Organizations
        fields = ('id', 'name', 'phone', 'notes')
