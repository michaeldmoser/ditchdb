"""Serializers for the ditchdb app."""
from rest_framework import serializers
from .models import (
    Property,
    Person,
    Organization,
    Owner,
    MailingAddress,
    Billing,
)


class PropertySerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""

        model = Property
        fields = (
            "id",
            "geocode",
            "address",
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


class PersonSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""

        model = Person
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

        model = Organization
        fields = ("id", "name", "phone", "notes")


class OwnerSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""

        model = Owner
        fields = ("id", "defaultname", "fullname", "nametype", "nametype_desc")


class MailingAddressSerializer(serializers.ModelSerializer):
    """Serializer to map party addresses into JSON format"""

    class Meta:
        model = MailingAddress
        fields = (
            "id",
            "defaultaddress",
            "address1",
            "address2",
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
            "id",
            "address_to_line",
            "attention_to_line",
            "street_address",
            "city",
            "state",
            "zip",
            "current_balance",
        )
