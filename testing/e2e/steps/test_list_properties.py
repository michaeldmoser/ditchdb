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
from factories import PropertyFactory


@scenario("../properties/properties.feature", "List properties")
def test_list_properties():
    """List properties."""


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
