"""Listing properties in the database feature tests."""

from pytest_bdd import (
    given,
    scenario,
    then,
    when,
)
import pytest
import re

from playwright.sync_api import expect, Page
from ditchdb.models import Property
from factories import PropertyFactory


@scenario("../properties/properties.feature", "List properties")
def test_list_properties():
    """List properties."""


@scenario(
    "../properties/properties.feature",
    "View property details from list for a new property",
)
def test_view_property_details():
    """View details for property from the list view"""


@given("properties are populated in the database", target_fixture="properties")
def _():
    """properties are populated in the database."""
    properties = PropertyFactory.create_batch(20)

    return properties


@when("a user navigates to the properties screen")
def _(page: Page, live_server):
    """a user navigates to the properties screen."""
    page.goto(live_server.url + "/app/properties")


@then("the user should see a list of properties")
def _(page: Page, live_server, properties):
    """the user should see a list of properties."""

    def expect_to_have_item(address):
        expect(
            page.get_by_role("list", name="Properties")
            .get_by_role("listitem")
            .get_by_role("link", name=address, exact=True)
        ).not_to_be_empty()

    expect(
        page.get_by_role("list", name="Properties").get_by_role("listitem")
    ).to_have_count(
        20
    )  # Make sure it's 20 and not > 20 or < 20.

    for property in properties:
        expect_to_have_item(property.address)


@when("the user selects a property from the list")
def _(page: Page, live_server, properties):
    """the user clicks on a property."""
    page.get_by_role("list", name="Properties").get_by_role(
        "link", name=properties[0].address, exact=True
    ).click()


@then("the user should see the property details")
def _(page: Page, live_server, properties):
    """the user should see the property details."""

    expect(page.get_by_label("Acres")).to_contain_text(
        str(properties[0].totmarket_acres)
    )
    expect(page.get_by_label("Geocode")).to_contain_text(properties[0].geocode)
    expect(page.get_by_label("Property Type")).to_contain_text(properties[0].proptype)
    expect(page.get_by_role("heading", name=properties[0].address)).to_be_attached()


@then("the user should see the mailing addresses")
def _(page: Page, properties):
    def expect_to_have_full_address(address):
        addressElement = (
            page.get_by_role("list", name="Addresses")
            .get_by_role("listitem")
            .get_by_text(address.address2)
            .locator("..")
        )

        expect(addressElement).to_be_attached()
        expect(addressElement).to_contain_text(address.address1)
        expect(addressElement).to_contain_text(address.address2)
        expect(addressElement).to_contain_text(address.city)
        expect(addressElement).to_contain_text(address.state)
        expect(addressElement).to_contain_text(address.zip)

    for address in properties[0].addresses.all():
        expect_to_have_full_address(address)


@then("the user should see the owners")
def _(page: Page, properties):
    for owner in properties[0].owners.all():
        expect(
            page.get_by_role("list", name="Property Owners")
            .get_by_role("listitem")
            .get_by_text(owner.fullname)
        ).to_be_attached()


@then("the user should see options to setup billing")
def _(page: Page, properties):
    expect(page.get_by_role("button", name="Setup Billing")).to_be_attached()
    expect(page.get_by_role("button", name="Setup Billing")).to_be_enabled()
    expect(page.get_by_text("No billing has been setup yet.")).to_be_attached()
