import os
from dotenv import dotenv_values
import os
import django
from django.db import transaction
from django.db.models import F

config = dotenv_values("../.env")

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", config.get("DJANGO_SETTINGS_MODULE", "backend.settings")
)
django.setup()

from ditchdb.models import (
    OrionProperty,
    Property,
    OrionOwner,
    OrionParty,
    Owner,
    Changes,
    MailingAddress,
    OrionPartyaddr,
    Owner,
    MailingAddress,
)  # noqa E402

# Create all new parties
new_parties = (
    OrionParty.objects.filter(properties__indistrict=True)
    .exclude(id__in=Owner.objects.values_list("party_id", flat=True))
    .distinct()
)
for new_party in new_parties:
    with transaction.atomic():
        for name in new_party.names.all():
            Owner.objects.create(
                defaultname=name.defaultname,
                fullname=name.fullname,
                nametype=name.nametype,
                nametype_desc=name.nametype_desc,
                party_id=new_party.id,
            )

        for address in new_party.addresses.all():
            MailingAddress.objects.create(
                defaultaddress=address.defaultaddress,
                address1=address.address1,
                address2=address.address2,
                address3=address.address3,
                country=address.country,
                postalcode=address.postalcode,
                city=address.city,
                state=address.state,
                zip=address.zip,
                party_id=new_party.id,
            )

# Find all new properties
parcels = OrionProperty.objects.get_new_properties_queryset()

# Copy new properties to OhdcProperty
for parcel in parcels:
    with transaction.atomic():
        property = Property.objects.create(
            id=parcel.property_id,
            geocode=parcel.geocode,
            addr_number=parcel.addr_number,
            addr_predirectional=parcel.addr_predirectional,
            addr_street=parcel.addr_street,
            addr_roadsuffix=parcel.addr_roadsuffix,
            addr_postdirectional=parcel.addr_postdirectional,
            address="{} {} {} {} {} {}".format(
                parcel.addr_number,
                parcel.addr_predirectional,
                parcel.addr_street,
                parcel.addr_roadsuffix,
                parcel.addr_postdirectional,
                parcel.addr_unitnumber,
            ),
            addr_city=parcel.addr_city,
            addr_state=parcel.addr_state,
            addr_zip=parcel.addr_zip,
            addr_unitnumber=parcel.addr_unitnumber,
            addr_unittype=parcel.addr_unittype,
            proptype=parcel.proptype,
            totmarket_acres=parcel.totmarket_acres,
            propcategory=parcel.propcategory,
            propsubcategory=parcel.propsubcategory,
            propsubcategory_desc=parcel.propsubcategory_desc,
        )

        Changes.objects.create(property=property, change_type=Changes.NEW_PROPERTY)

        orion_owners = parcel.owners.all()
        for owner in orion_owners:
            owners = Owner.objects.filter(party_id=owner.id)
            property.owners.add(*owners)

            mailing_addresses = MailingAddress.objects.filter(party_id=owner.id)
            property.addresses.add(*mailing_addresses)

# Track removed properties
parcels = Property.objects.exclude(
    orion_property__in=OrionProperty.objects.in_district()
)
for parcel in parcels:
    Changes.objects.create(property=parcel, change_type=Changes.PROPERTY_REMOVED)


# Track changes in property details
parcels = (
    Property.objects.exclude(addr_number=F("orion_property__addr_number"))
    .exclude(addr_predirectional=F("orion_property__addr_predirectional"))
    .exclude(addr_street=F("orion_property__addr_street"))
    .exclude(addr_roadsuffix=F("orion_property__addr_roadsuffix"))
    .exclude(addr_postdirectional=F("orion_property__addr_postdirectional"))
    .exclude(addr_city=F("orion_property__addr_city"))
    .exclude(addr_state=F("orion_property__addr_state"))
    .exclude(addr_zip=F("orion_property__addr_zip"))
    .exclude(addr_unitnumber=F("orion_property__addr_unitnumber"))
    .exclude(addr_unittype=F("orion_property__addr_unittype"))
    .exclude(totmarket_acres=F("orion_property__totmarket_acres"))
    .exclude(proptype="EP - Exempt Property")
)
for parcel in parcels:
    Changes.objects.create(property=parcel, change_type=Changes.PROPERTY_CHANGED)


# owners = Owner.objects.all()
# for owner in owners:
#     if (
#         not OrionOwner.objects.filter(propertyid=owner.property_id)
#         .filter(party_id=owner.party_id)
#         .exists()
#     ):
#         Chagnes.objects.create(
#             property=owner.property, change_type=Changes.OWNERSHIP_CHANGED
#         )
#
# addresses = PropertyAddress.objects.filter(defaultaddress=True)
# for address in addresses:
#     if not (
#         OrionPartyaddr.objects.filter(defaultaddress=True)
#         .filter(address1=address.address1)
#         .filter(address2=address.address2)
#         .filter(address3=address.address3)
#         .filter(country=address.country)
#         .filter(postalcode=address.postalcode)
#         .filter(city=address.city)
#         .filter(state=address.state)
#         .filter(zip=address.zip)
#     ).exists():
#         owners = address.party.owner.select_related("property")
#         for owner in owners:
#             Changes.objects.create(
#                 property=owner.property, change_type=Changes.ADDRESS_CHANGED
#             )
