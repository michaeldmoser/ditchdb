"""
The models module contains the Django models based on the data from Montana's Orion database. 
"""
from django.db import models


class OrionOwner(models.Model):
    propertyid = models.IntegerField()
    taxyear = models.IntegerField()
    partyid = models.IntegerField()
    percentownership = models.DecimalField(
        max_digits=15, decimal_places=6, blank=True, null=True)
    primaryowner = models.TextField()  # This field type is a guess.
    interesttype = models.CharField(max_length=60, blank=True, null=True)
    timestampchange = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'orion_owner'


class OrionPartyaddr(models.Model):
    partyaddrid = models.IntegerField()
    partyid = models.IntegerField()
    # This field type is a guess.
    defaultaddress = models.TextField(blank=True, null=True)
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
        db_table = 'orion_partyaddr'


class OrionPartyname(models.Model):
    partynameid = models.IntegerField()
    partyid = models.IntegerField()
    # This field type is a guess.
    defaultname = models.TextField(blank=True, null=True)
    fullname = models.CharField(max_length=167, blank=True, null=True)
    nametype = models.IntegerField(blank=True, null=True)
    nametype_desc = models.CharField(max_length=60, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'orion_partyname'


class OrionProperty(models.Model):
    propertyid = models.IntegerField()
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
    taxyear = models.IntegerField()
    indistrict = models.BooleanField()

    class Meta:
        managed = True
        db_table = 'orion_property'
