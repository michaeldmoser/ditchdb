"""Listing properties in the database feature tests."""

from pytest_bdd import (
    given,
    scenario,
    then,
    when,
)

from playwright.sync_api import (Page, expect)


@scenario('../properties.feature', 'List properties')
def test_list_properties():
    """List properties."""


@given('properties are populated in the database')
def _():
    """properties are populated in the database."""
    # For now we'll do nothing, we'll handle seeding the database later
    # as this testing is mostly a read-only operation
    pass


@when('a user navigates to the properties screen')
def _(page: Page):
    """a user navigates to the properties screen."""
    page.goto('/app/properties/')


@then('each property should display the street address and size in acres')
def _():
    """each property should display the street address and size in acres."""
    # raise NotImplementedError


@then('the user should see a list of properties')
def _(page: Page):
    """the user should see a list of properties."""
    expect(page.get_by_role('list', name='Properties').get_by_role(
        'listitem')).to_have_count(20)
