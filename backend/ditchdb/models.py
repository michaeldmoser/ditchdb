"""Ditchdb models"""
from django.db import models

# OHDC models
# The following modes are copies of the Orion models. They are used as
#  a mechanism to compare the Orion data with the OHDC data to identify
#  changes in the Orion data.


class OhdcOwner(models.Model):
    """Property ownership"""
    propertyid = models.IntegerField()
    partyid = models.IntegerField()
    primaryowner = models.BooleanField(blank=False, null=False, default=False)

    class Meta:
        """Model metadata."""
        managed = True
        db_table = 'ohdc_owner'
        unique_together = (('propertyid', 'partyid'),)


class OhdcPartyaddr(models.Model):
    """Person or organization mailing address."""
    partyid = models.IntegerField()
    defaultaddress = models.BooleanField(
        blank=False, null=False, default=False)
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
        db_table = 'ohdc_partyaddr'


class OhdcPartyname(models.Model):
    """Person or organization name."""
    partyid = models.IntegerField()
    defaultname = models.BooleanField(blank=False, null=False, default=False)
    fullname = models.CharField(max_length=167, blank=True, null=True)
    nametype = models.IntegerField(blank=True, null=True)
    nametype_desc = models.CharField(max_length=60, blank=True, null=True)

    class Meta:
        """Model metadata."""
        managed = True
        db_table = 'ohdc_partyname'


class People(models.Model):
    """Model definition for People."""
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    email = models.CharField(max_length=320, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    alternate_phone = models.CharField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    @property
    def name(self):
        """Return the contact's name."""
        return '{} {}'.format(self.first_name, self.last_name)

    class Meta:
        """Model metadata."""
        managed = True
        db_table = 'people'


class Organizations(models.Model):
    """Model definition for Organizations."""
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        """Model metadata."""
        managed = True
        db_table = 'organizations'


class Property(models.Model):
    """Model definition for Property."""
    id = models.IntegerField(primary_key=True)
    geocode = models.CharField(max_length=60, blank=True, null=True)
    addr_number = models.CharField(max_length=20, blank=True, null=True)
    addr_predirectional = models.CharField(max_length=5, blank=True, null=True)
    addr_street = models.CharField(max_length=64, blank=True, null=True)
    addr_roadsuffix = models.CharField(max_length=5, blank=True, null=True)
    addr_postdirectional = models.CharField(
        max_length=5, blank=True, null=True)
    addr_city = models.CharField(max_length=40, blank=True, null=True)
    addr_state = models.CharField(blank=True, null=True)
    addr_zip = models.CharField(max_length=10, blank=True, null=True)
    addr_unitnumber = models.CharField(max_length=20, blank=True, null=True)
    addr_unittype = models.CharField(max_length=5, blank=True, null=True)
    proptype = models.CharField(max_length=60, blank=True, null=True)
    totmarket_acres = models.DecimalField(
        max_digits=21, decimal_places=6, blank=True, null=True)
    propcategory = models.CharField(max_length=5, blank=True, null=True)
    propsubcategory = models.CharField(max_length=20, blank=True, null=True)
    propsubcategory_desc = models.CharField(
        max_length=60, blank=True, null=True)
    has_changes = models.BooleanField()

    people_owners = models.ManyToManyField(
        People,
        related_name='owns',
        blank=True,
    )

    organization_owners = models.ManyToManyField(
        Organizations,
        related_name='owns',
        blank=True,
    )

    @property
    def owners(self):
        """Return a list of owners."""
        owners = []
        for owner in self.people_owners.all():
            owners.append(owner)
        for owner in self.organization_owners.all():
            owners.append(owner)
        return owners

    class Meta:
        """Model metadata."""
        managed = True
        db_table = 'ohdc_property'
