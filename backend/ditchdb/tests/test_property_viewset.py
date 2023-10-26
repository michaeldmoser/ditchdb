import pytest
from django.urls import reverse

from ditchdb.models import Property, Billing


def test_person_added_to_billing_record(property, client):
    """Should relate a person to a billing record"""
    person = property.people.first()
    address = property.addresses.first()

    data = {
        "address_to_line": person.name,
        "attention_to_line": "",
        "street_address": address.address2,
        "city": address.city,
        "state": address.state,
        "zip": address.zip,
        "current_balance": 0,
        "bill_to": person.id,  # Set bill_to to the Person's ID
    }

    url = reverse("property-billing", args=[property.id])
    response = client.post(url, data, format="json")

    billing = Billing.objects.first()

    assert response.status_code == 200
    assert billing.person == person


def test_no_person(property, client, faker):
    """Should create billing record without person when bill_to is empty"""
    address = property.addresses.first()

    data = {
        "address_to_line": faker.name(),
        "attention_to_line": "",
        "street_address": address.address2,
        "city": address.city,
        "state": address.state,
        "zip": address.zip,
        "current_balance": 0,
        "bill_to": "",
    }

    url = reverse("property-billing", args=[property.id])
    response = client.post(url, data, format="json")

    assert response.status_code == 200
    assert response.data.get("address_to_line") == data.get("address_to_line")
    assert response.data.get("street_address") == data.get("street_address")
    assert response.data.get("city") == data.get("city")
    assert response.data.get("state") == data.get("state")
    assert response.data.get("zip") == data.get("zip")
    assert response.data.get("current_balance") == data.get("current_balance")
