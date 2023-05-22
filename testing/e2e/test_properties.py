"""List the properties feature tests."""

from pytest_bdd import (
    given,
    scenario,
    then,
    when,
)


@scenario('properties.feature', 'List properties')
def test_list_properties():
    """List properties."""


@given('the following properties are in the database')
def _():
    """the following properties are in the database."""
    raise NotImplementedError


@when('I list properties')
def _():
    """I list properties."""
    raise NotImplementedError


@then('I should see the following properties')
def _():
    """I should see the following properties."""
    raise NotImplementedError

