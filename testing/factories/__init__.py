from factory.django import DjangoModelFactory
from factory import Factory, LazyFunction, Sequence
from faker import Faker

from ditchdb.models import Property


fake = Faker()


def geocode():
    """
    Produce a fake geocode
    """
    geocode = [
        "04",  # missoula county
        str(fake.random_int(min=1, max=9999)).zfill(4),
        str(fake.random_int(min=1, max=99)).zfill(2),
        str(fake.random_int(min=1, max=9)),
        str(fake.random_int(min=1, max=99)).zfill(2),
        str(fake.random_int(min=1, max=99)).zfill(2),
        str(fake.random_int(min=1, max=9999)).zfill(4),
    ]

    return "-".join(geocode)


class PropertyFactory(DjangoModelFactory):
    class Meta:
        model = Property

    id = Sequence(lambda n: n + 10000000)
    geocode = LazyFunction(geocode)
    addr_city = "Missoula"
    addr_state = "MT"
    addr_zip = LazyFunction(lambda: fake.random_element(elements=[59801, 59804, 59808]))
    addr_unitnumber = None
    addr_unittype = None
    proptype = LazyFunction(
        lambda: fake.random_element(
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
            ]
        )
    )
    totmarket_acres = LazyFunction(
        lambda: fake.pyfloat(min_value=0, max_value=26, right_digits=2)
    )
    propcategory = None
    propsubcategory = None
    propsubcategory_desc = None
    address = LazyFunction(lambda: fake.street_address())
