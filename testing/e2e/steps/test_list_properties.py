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
from factories import PropertyFactory, BillablePropertyFactory


@scenario("../properties/properties.feature", "List properties")
def test_list_properties():
    """List properties."""


@scenario(
    "../properties/properties.feature",
    "View property details from list for a new property",
)
def test_view_property_details():
    """View details for property from the list view"""


@scenario(
    "../properties/properties.feature",
    "View property details for a property with billing setup",
)
def test_view_property_details_for_existing_property():
    """View details for property with billing setup"""


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


@when("the user selects a property from the list", target_fixture="property")
def _(page: Page, properties):
    """the user clicks on a property."""
    page.get_by_role("list", name="Properties").get_by_role(
        "link", name=properties[0].address, exact=True
    ).click()

    return properties[0]


@then("the user should see the property details")
def _(page: Page, live_server, property):
    """the user should see the property details."""

    expect(page.get_by_label("Acres")).to_contain_text(str(property.totmarket_acres))
    expect(page.get_by_label("Geocode")).to_contain_text(property.geocode)
    expect(page.get_by_label("Property Type")).to_contain_text(property.proptype)
    expect(page.get_by_role("heading", name=property.address)).to_be_attached()


@then("the user should see the mailing addresses")
def _(page: Page, property):
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

    for address in property.addresses.all():
        expect_to_have_full_address(address)


@then("the user should see the owners")
def _(page: Page, property):
    for owner in property.owners.all():
        expect(
            page.get_by_role("list", name="Property Owners")
            .get_by_role("listitem")
            .get_by_text(owner.fullname)
        ).to_be_attached()


@then("the user should see options to setup billing")
def _(page: Page):
    expect(page.get_by_role("button", name="Setup Billing")).to_be_attached()
    expect(page.get_by_role("button", name="Setup Billing")).to_be_enabled()
    expect(page.get_by_text("No billing has been setup yet.")).to_be_attached()


@given("a property with billing setup", target_fixture="property")
def _():
    """a property with billing setup."""
    property = BillablePropertyFactory()

    return property


@when("a user navigates to the property's screen")
def _(page: Page, live_server, property):
    """a user navigates to the propery's screen."""
    page.goto(live_server.url + f"/app/properties/{property.id}")


@then("the user should see billing details")
def _(page: Page, property):
    """the user should see the billing details."""
    billing = property.billing.filter(active=True).first()

    billingSection = page.get_by_role("region", name="Billing")

    expect(billingSection.get_by_label("Current Balance")).to_contain_text(
        f"${billing.current_balance:.2f}"
    )
    expect(billingSection.get_by_label("Billing Address")).to_contain_text(
        billing.address_to_line
    )
    expect(billingSection.get_by_label("Billing Address")).to_contain_text(billing.city)
    expect(billingSection.get_by_label("Billing Address")).to_contain_text(
        billing.state
    )
    expect(billingSection.get_by_label("Billing Address")).to_contain_text(billing.zip)
