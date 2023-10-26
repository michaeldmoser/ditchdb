import pytest
from django.urls import reverse

from ditchdb.models import Property, Billing


def test_retrieve_bill_to_data_for_person(client, property):
    """Should retrieve bill_to data for a person model"""
    owner = property.owners.first()
    person = owner.person
    address = owner.addresses.filter(defaultaddress=True).first()

    url = reverse("billto", args=[person.id])
    response = client.get(url)

    data = response.data
    assert response.status_code == 200

    assert data.get("address_to_line") == person.name
    assert data.get("attention_to_line") == ""
    assert data.get("street_address") == address.address2
    assert data.get("city") == address.city
    assert data.get("state") == address.state
    assert data.get("zip") == address.zip
