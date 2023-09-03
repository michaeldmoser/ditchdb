"""Ditchdb models"""
from django.db import models
from django.db.models.query import QuerySet
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


# OHDC models
# The following modes are copies of the Orion models. They are used as
#  a mechanism to compare the Orion data with the OHDC data to identify
#  changes in the Orion data.
class Billing(models.Model):
    """Tracking billing information details for a property or properties"""

    address_to_line = models.CharField(blank=True, null=True)
    attention_to_line = models.CharField(blank=True, null=True)

    limit = models.Q(app_label="ditchdb", model="people") | models.Q(
        app_label="ditchdb", model="organizations"
    )
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        limit_choices_to=limit,
        null=True,
        blank=True,
    )
    object_id = models.PositiveIntegerField(blank=True, null=True)
    bill_to = GenericForeignKey("content_type", "object_id")
    active = models.BooleanField(default=True)

    street_address = models.CharField(max_length=64, blank=True, null=True)
    country = models.CharField(max_length=20, blank=True, null=True)
    city = models.CharField(max_length=40, blank=True, null=True)
    state = models.CharField(max_length=2, blank=True, null=True)
    zip = models.CharField(max_length=50, blank=True, null=True)

    current_balance = models.DecimalField(
        max_digits=21, decimal_places=6, blank=True, null=True
    )

    property = models.ForeignKey(
        "Property",
        on_delete=models.CASCADE,
        related_name="billing",
        blank=True,
        null=True,
        db_constraint=False,
    )


class Property(models.Model):
    """Model definition for Property."""

    id = models.IntegerField(primary_key=True)

    geocode = models.CharField(max_length=60, blank=True, null=True)
    addr_number = models.CharField(max_length=20, blank=True, null=True)
    addr_predirectional = models.CharField(max_length=5, blank=True, null=True)
    addr_street = models.CharField(max_length=64, blank=True, null=True)
    addr_roadsuffix = models.CharField(max_length=5, blank=True, null=True)
    addr_postdirectional = models.CharField(max_length=5, blank=True, null=True)
    addr_city = models.CharField(max_length=40, blank=True, null=True)
    addr_state = models.CharField(blank=True, null=True)
    addr_zip = models.CharField(max_length=10, blank=True, null=True)
    addr_unitnumber = models.CharField(max_length=20, blank=True, null=True)
    addr_unittype = models.CharField(max_length=5, blank=True, null=True)
    proptype = models.CharField(max_length=60, blank=True, null=True)
    totmarket_acres = models.DecimalField(
        max_digits=21, decimal_places=6, blank=True, null=True
    )
    propcategory = models.CharField(max_length=5, blank=True, null=True)
    propsubcategory = models.CharField(max_length=20, blank=True, null=True)
    propsubcategory_desc = models.CharField(max_length=60, blank=True, null=True)
    lastupdated = models.DateTimeField(blank=True, null=True)

    class Meta:
        """Model metadata."""

        managed = True
        db_table = "ohdc_property"


class People(models.Model):
    """Model definition for People."""

    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    email = models.CharField(max_length=320, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    alternate_phone = models.CharField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    owns = models.ManyToManyField(
        Property,
        related_name="people_owners",
    )

    @property
    def name(self):
        """Return the contact's name."""
        return "{} {}".format(self.first_name, self.last_name)

    class Meta:
        """Model metadata."""

        managed = True
        db_table = "people"


class Organizations(models.Model):
    """Model definition for Organizations."""

    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    owns = models.ManyToManyField(
        Property,
        related_name="organization_owners",
    )

    class Meta:
        """Model metadata."""

        managed = True
        db_table = "organizations"


class Party(models.Model):
    id = models.IntegerField(primary_key=True)

    class Meta:
        """Model metadata."""

        managed = True
        db_table = "party"


class Partyaddr(models.Model):
    """Person or organization mailing address."""

    party = models.ForeignKey(
        Party,
        related_name="addresses",
        on_delete=models.CASCADE,
        name="party",
        db_column="partyid",
    )
    defaultaddress = models.BooleanField(blank=False, null=False, default=False)
    address1 = models.CharField(max_length=64, blank=True, null=True)
    address2 = models.CharField(max_length=64, blank=True, null=True)
    address3 = models.CharField(max_length=64, blank=True, null=True)
    country = models.CharField(max_length=20, blank=True, null=True)
    postalcode = models.CharField(max_length=20, blank=True, null=True)
    city = models.CharField(max_length=40, blank=True, null=True)
    state = models.CharField(max_length=2, blank=True, null=True)
    zip = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        """Model metadata."""

        managed = True
        db_table = "ohdc_partyaddr"


class Partyname(models.Model):
    """Person or organization name."""

    party = models.ForeignKey(
        Party,
        related_name="names",
        on_delete=models.CASCADE,
        name="party",
        db_column="partyid",
    )

    defaultname = models.BooleanField(blank=False, null=False, default=False)
    fullname = models.CharField(max_length=167, blank=True, null=True)
    nametype = models.IntegerField(blank=True, null=True)
    nametype_desc = models.CharField(max_length=60, blank=True, null=True)

    class Meta:
        """Model metadata."""

        managed = True
        db_table = "ohdc_partyname"


class Owner(models.Model):
    """Property ownership"""

    property = models.ForeignKey(
        Property,
        related_name="owners",
        on_delete=models.CASCADE,
        db_column="propertyid",
    )
    party = models.ForeignKey(
        Party,
        related_name="owner",
        on_delete=models.CASCADE,
        name="party",
        db_column="partyid",
    )
    primaryowner = models.BooleanField(blank=False, null=False, default=False)
    timestampchange = models.DateTimeField(blank=True, null=True)

    class Meta:
        """Model metadata."""

        managed = True
        db_table = "ohdc_owner"
        unique_together = (("property", "party"),)

        unique_together = (("property", "party"),)


class Changes(models.Model):
    """Model the changes that have occurred since the last orion database update"""

    NEW_PROPERTY = "new"
    PROPERTY_REMOVED = "removed"
    PROPERTY_CHANGED = "changed"
    OWNERSHIP_CHANGED = "ownership"
    ADDRESS_CHANGED = "address"

    CHANGE_TYPE_CHOICES = [
        (NEW_PROPERTY, "New property added"),
        (PROPERTY_REMOVED, "Property was removed from orion database"),
        (PROPERTY_CHANGED, "Property details were changed in orion database"),
        (OWNERSHIP_CHANGED, "Property ownership was changed in orion database"),
        (ADDRESS_CHANGED, "Mailing address was changed in orion database"),
    ]

    property = models.ForeignKey(
        Property,
        related_name="changes",
        on_delete=models.CASCADE,
    )

    change_type = models.CharField(
        max_length=255,
        choices=CHANGE_TYPE_CHOICES,
        null=True,
        blank=True,
        default=None,
    )

    class Meta:
        """Model metadata."""

        managed = True
        db_table = "changes_queue"


class OrionParty(models.Model):
    id = models.IntegerField(primary_key=True)

    class Meta:
        """Model metadata."""

        managed = True
        db_table = "orion_party"


class OrionPartyaddr(models.Model):
    partyaddrid = models.IntegerField()
    party = models.ForeignKey(
        OrionParty,
        related_name="addresses",
        on_delete=models.CASCADE,
        name="party",
        db_column="partyid",
    )
    # This field type is a guess.
    defaultaddress = models.BooleanField(blank=False, null=False, default=False)
    address1 = models.CharField(max_length=64, blank=True, null=True)
    address2 = models.CharField(max_length=64, blank=True, null=True)
    address3 = models.CharField(max_length=64, blank=True, null=True)
    country = models.CharField(max_length=20, blank=True, null=True)
    postalcode = models.CharField(max_length=20, blank=True, null=True)
    city = models.CharField(max_length=40, blank=True, null=True)
    state = models.CharField(max_length=2, blank=True, null=True)
    zip = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = True
        db_table = "orion_partyaddr"


class OrionPartyname(models.Model):
    partynameid = models.IntegerField()
    party = models.ForeignKey(
        OrionParty,
        related_name="names",
        on_delete=models.CASCADE,
        name="party",
        db_column="partyid",
    )

    # This field type is a guess.
    defaultname = models.TextField(blank=True, null=True)
    fullname = models.CharField(max_length=167, blank=True, null=True)
    nametype = models.IntegerField(blank=True, null=True)
    nametype_desc = models.CharField(max_length=60, blank=True, null=True)

    class Meta:
        managed = True
        db_table = "orion_partyname"


class OrionPropertyManager(models.Manager):
    """Query by the most year and/or properties within the irrigation district"""

    __latest_year = None

    def __init__(self) -> None:
        super().__init__()

    def get_new_properties_queryset(self):
        """Return new properties"""
        return self.in_district().exclude(property_id__in=Property.objects.all())

    def in_district(self):
        """Return properties in district"""
        return self.get_queryset().filter(indistrict=True)


class OrionProperty(models.Model):
    property = models.ForeignKey(
        Property,
        related_name="orion_property",
        on_delete=models.DO_NOTHING,
        db_column="propertyid",
        null=True,
        blank=True,
        db_constraint=False,
    )

    owners = models.ManyToManyField(
        OrionParty,
        related_name="properties",
        through="OrionOwner",
        through_fields=("property", "party"),
    )

    geocode = models.CharField(max_length=60, blank=True, null=True)
    addr_number = models.CharField(max_length=20, blank=True, null=True)
    addr_predirectional = models.CharField(max_length=5, blank=True, null=True)
    addr_street = models.CharField(max_length=64, blank=True, null=True)
    addr_roadsuffix = models.CharField(max_length=5, blank=True, null=True)
    addr_postdirectional = models.CharField(max_length=5, blank=True, null=True)
    addr_city = models.CharField(max_length=40, blank=True, null=True)
    addr_state = models.CharField(blank=True, null=True)
    addr_zip = models.CharField(max_length=10, blank=True, null=True)
    addr_unitnumber = models.CharField(max_length=20, blank=True, null=True)
    addr_unittype = models.CharField(max_length=5, blank=True, null=True)
    proptype = models.CharField(max_length=60, blank=True, null=True)
    totmarket_acres = models.DecimalField(
        max_digits=21, decimal_places=6, blank=True, null=True
    )
    propcategory = models.CharField(max_length=5, blank=True, null=True)
    propsubcategory = models.CharField(max_length=20, blank=True, null=True)
    propsubcategory_desc = models.CharField(max_length=60, blank=True, null=True)
    taxyear = models.IntegerField()
    indistrict = models.BooleanField(blank=False, null=False, default=False)
    lastupdated = models.DateTimeField(blank=True, null=True)

    objects = OrionPropertyManager()

    class Meta:
        managed = True
        db_table = "orion_property"
        indexes = [
            models.Index(fields=["taxyear", "indistrict"]),
            models.Index(fields=["property", "taxyear"]),
        ]


class OrionOwner(models.Model):
    party = models.ForeignKey(
        OrionParty,
        related_name="owners",
        on_delete=models.CASCADE,
        db_column="partyid",
    )
    property = models.ForeignKey(
        OrionProperty,
        on_delete=models.CASCADE,
        null=True,
    )

    propertyid = models.IntegerField()
    taxyear = models.IntegerField()
    percentownership = models.DecimalField(
        max_digits=15, decimal_places=6, blank=True, null=True
    )
    primaryowner = models.TextField()  # This field type is a guess.
    interesttype = models.CharField(max_length=60, blank=True, null=True)
    timestampchange = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = "orion_owner"

        indexes = [
            models.Index(fields=["propertyid", "taxyear"]),
        ]
