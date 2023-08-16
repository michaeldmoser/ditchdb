"""Serializers for the ditchdb app."""
from rest_framework import serializers
from .models import Property, People, Organizations, Partyname, Partyaddr, Billing


class PropertySerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""

        model = Property
        fields = (
            "id",
            "geocode",
            "addr_number",
            "addr_predirectional",
            "addr_street",
            "addr_roadsuffix",
            "addr_postdirectional",
            "addr_city",
            "addr_state",
            "addr_zip",
            "addr_unitnumber",
            "addr_unittype",
            "proptype",
            "totmarket_acres",
            "propcategory",
            "propsubcategory",
            "propsubcategory_desc",
        )


class PeopleSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""

        model = People
        fields = (
            "id",
            "name",
            "first_name",
            "last_name",
            "email",
            "phone",
            "alternate_phone",
            "notes",
        )


class OrganizationSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""

        model = Organizations
        fields = ("id", "name", "phone", "notes")


class PartynameSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""

        model = Partyname
        fields = ("id", "defaultname", "fullname", "nametype", "nametype_desc")


class PartyaddressSerializer(serializers.ModelSerializer):
    """Serializer to map party addresses into JSON format"""

    class Meta:
        model = Partyaddr
        fields = (
            "defaultaddress",
            "address1",
            "address1",
            "address3",
            "country",
            "postalcode",
            "city",
            "state",
            "zip",
        )


class BillingSerializer(serializers.ModelSerializer):
    """Serializer to map billing addresses into JSON format"""

    class Meta:
        model = Billing
        fields = (
            "address_to_line",
            "attention_to_line",
            "street_address",
            "city",
            "state",
            "zip",
            "current_balance",
        )
