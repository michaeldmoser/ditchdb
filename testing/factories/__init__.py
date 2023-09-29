from dataclasses import dataclass
from factory.django import DjangoModelFactory
from factory import (
    Factory,
    LazyFunction,
    LazyAttribute,
    Sequence,
    post_generation,
    Faker,
)

from ditchdb.models import Property, MailingAddress, Owner, Billing


NAME_TYPES = {
    None: None,
    "AKA - Also Known As": 127568,
    "L Additional Legal Owners": 130656,
    "BENF - Beneficiary Deed": 195344,
    "CB Contract Buyer": 130655,
    "C - Contact Name": 125251,
    "B - Business Name": 125250,
}


@dataclass
class Geocode(object):
    part1: int
    part2: int
    part3: int
    part4: int
    part5: int
    part6: int
    county: int = 4

    def __str__(self):
        return "-".join(
            [
                str(self.county).zfill(2),
                str(self.part1).zfill(4),
                str(self.part2).zfill(2),
                str(self.part3),
                str(self.part4).zfill(2),
                str(self.part5).zfill(2),
                str(self.part6).zfill(4),
            ]
        )


class GeocodeFactory(Factory):
    class Meta:
        model = Geocode

    county = 4
    part1 = Faker("random_int", min=1, max=9999)
    part2 = Faker("random_int", min=1, max=99)
    part3 = Faker("random_int", min=1, max=9)
    part4 = Faker("random_int", min=1, max=99)
    part5 = Faker("random_int", min=1, max=99)
    part6 = Faker("random_int", min=1, max=9999)


class PropertyFactory(DjangoModelFactory):
    class Meta:
        model = Property
        skip_postgeneration_save = True

    id = Sequence(lambda n: n + 10000000)
    geocode = LazyFunction(lambda: str(GeocodeFactory()))
    addr_city = "Missoula"
    addr_state = "MT"
    addr_zip = Faker("random_element", elements=[59801, 59804, 59808])
    addr_unitnumber = None
    addr_unittype = None
    proptype = Faker(
        "random_element",
        elements=[
            "CONDO_U - Condo - Urban",
            "TU - Townhouse Urban",
            "EP - Exempt Property",
            "VAC_R - Vacant Land - Rural",
            "APT_U - Apartment Urban",
            "NV - Non-Valued Property",
            "TR - Townhouse Rural",
            "IMP_R - Improved Property - Rural",
            "IMP_U - Improved Property - Urban",
            "KU - Condominium Urban",
            "VAC_U - Vacant Land - Urban",
            "EP_PART - Partial Exempt Property",
            "PARK_U - Manufactured Home Park -  Urban",
            "GRAVEL - Gravel Pit",
        ],
    )
    totmarket_acres = Faker("pyfloat", min_value=0, max_value=26, right_digits=2)
    propcategory = None
    propsubcategory = None
    propsubcategory_desc = None
    address = Faker("street_address")

    @post_generation
    def addresses(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for address in extracted:
                self.addresses.add(address)
        else:
            self.addresses.add(MailingAddressFactory())
            self.addresses.add(MailingAddressFactory())

    @post_generation
    def owners(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for owner in extracted:
                self.owners.add(owner)
        else:
            self.owners.add(OwnerFactory())
            self.owners.add(OwnerFactory())


class MailingAddressFactory(DjangoModelFactory):
    class Meta:
        model = MailingAddress
        skip_postgeneration_save = True

    defaultaddress = True

    address1 = LazyAttribute(
        lambda x: "MAIL TO: " + Faker._get_faker().name()
        if Faker._get_faker().random_int(min=0, max=100) < 10
        else ""
    )
    address2 = Faker("street_address")
    country = "US"
    city = Faker("city")
    state = Faker("state_abbr")
    zip = Faker("zipcode")


class OwnerFactory(DjangoModelFactory):
    class Meta:
        model = Owner
        skip_postgeneration_save = True

    defaultname = Faker("boolean", chance_of_getting_true=50)
    primaryowner = Faker("boolean", chance_of_getting_true=50)

    fullname = LazyFunction(
        lambda: (
            Faker._get_faker().last_name() + " " + Faker._get_faker().first_name()
        ).upper()
    )
    nametype = LazyAttribute(lambda x: NAME_TYPES.get(x.nametype_desc, None))
    nametype_desc = Faker(
        "random_element",
        elements=NAME_TYPES.keys(),
    )


def fetch_propery_owner_name(billing):
    """Retrieve the owner's name from the Property's owner record or return some random name if not available"""
    try:
        if billing.property.owners.count() > 0:
            return billing.property.owners.first().fullname
    except AttributeError:
        pass  # supress errors and return a random name

    return Faker._get_faker().name()


def fetch_mailing_address_field(field, fallback_faker_provider):
    """Retrieve the mailing address field from the Property's mailing address record or return some random value if not available"""

    def lazy_attribute(billing):
        try:
            if billing.property.addresses.count() > 0:
                return getattr(billing.property.addresses.first(), field)
        except AttributeError:
            pass  # supress errors and return a random name

        return getattr(Faker._get_faker(), fallback_faker_provider)()

    return lazy_attribute


class BillingFactory(DjangoModelFactory):
    class Meta:
        model = Billing
        skip_postgeneration_save = True

    active = True

    current_balance = Faker("pyfloat", min_value=0, max_value=1000, right_digits=2)
    address_to_line = LazyAttribute(fetch_propery_owner_name)

    attention_to_line = ""
    street_address = LazyAttribute(
        fetch_mailing_address_field("address2", "street_address")
    )
    country = ""
    city = LazyAttribute(fetch_mailing_address_field("city", "city"))
    state = LazyAttribute(fetch_mailing_address_field("state", "state_abbr"))
    zip = LazyAttribute(fetch_mailing_address_field("zip", "zipcode"))


class BillablePropertyFactory(PropertyFactory):
    class Meta:
        model = Property
        skip_postgeneration_save = True

    @post_generation
    def billing(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for billing in extracted:
                self.billing.add(billing)
        else:
            self.billing.add(BillingFactory(property=self))
