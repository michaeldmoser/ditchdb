"""Listing properties in the database feature tests."""

from pytest_bdd import (
    given,
    scenario,
    then,
    when,
)
import pytest

from playwright.sync_api import expect, Page
from ditchdb.models import Property


@scenario("../properties/properties.feature", "List properties")
def test_list_properties():
    """List properties."""


@given("properties are populated in the database", target_fixture="properties")
def _():
    """properties are populated in the database."""
    properties = [
        Property.objects.create(
            id=i,
            geocode="123456789",
            addr_number="123",
            addr_predirectional="N",
            addr_street="Main",
            addr_roadsuffix="St",
            addr_postdirectional="",
            addr_city="Anytown",
            addr_state="CO",
            addr_zip="12345",
            address=f"{i} N Main St",
        )
        for i in range(20)
    ]

    return properties


@when("a user navigates to the properties screen")
def _(page: Page, live_server):
    """a user navigates to the properties screen."""
    page.goto(live_server.url + "/app/properties")


@then("each property should display the street address and size in acres")
def _():
    """each property should display the street address and size in acres."""
    # raise NotImplementedError


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
    ).to_have_count(20)

    expect_to_have_item("0 N Main St")
    expect_to_have_item("1 N Main St")
    expect_to_have_item("2 N Main St")
    expect_to_have_item("3 N Main St")
    expect_to_have_item("4 N Main St")
    expect_to_have_item("5 N Main St")
    expect_to_have_item("6 N Main St")
    expect_to_have_item("7 N Main St")
    expect_to_have_item("8 N Main St")
    expect_to_have_item("9 N Main St")
    expect_to_have_item("10 N Main St")
    expect_to_have_item("11 N Main St")
    expect_to_have_item("12 N Main St")
    expect_to_have_item("13 N Main St")
    expect_to_have_item("14 N Main St")
    expect_to_have_item("15 N Main St")
    expect_to_have_item("16 N Main St")
    expect_to_have_item("17 N Main St")
    expect_to_have_item("18 N Main St")
    expect_to_have_item("19 N Main St")
