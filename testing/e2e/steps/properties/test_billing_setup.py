"""Billing setup on a property"""

from pytest_bdd import (
    given,
    scenario,
    then,
    when,
)
import pytest

from playwright.sync_api import expect, Page
from factories import PropertyFactory, BillingFactory


@scenario("../../properties/billing_setup.feature", "Enter basic billing information")
def test_basic_billing_information():
    """Enter basic billing information"""
    pass


@given("a property without billing information", target_fixture="property")
def a_property_without_billing_information(page: Page, live_server):
    """a property without billing information"""
    property = PropertyFactory()
    page.goto(f"{live_server.url}/app/properties/{property.id}")
    return property


@when("I enter the billing information", target_fixture="billing")
def _(page: Page):
    """I enter the billing information"""
    billing = BillingFactory.stub()

    page.get_by_role("button", name="Setup billing").click()

    page.get_by_role("textbox", name="Billing To").fill(billing.address_to_line)
    page.get_by_role("textbox", name="Street Address").fill(billing.street_address)
    page.get_by_role("textbox", name="City").fill(billing.city)
    page.get_by_role("textbox", name="State").fill(billing.state)
    page.get_by_role("textbox", name="Zip").fill(billing.zip)

    page.get_by_role("button", name="Save").click()

    return billing


@then("the billing information is saved")
def _(page: Page, billing):
    """the billing information should be saved"""
    expect(page.get_by_role("heading", name="Setup Billing")).not_to_be_visible()
    expect(
        page.get_by_role("region", name="Billing").get_by_role("alert")
    ).not_to_be_visible()


@then("the billing information should be displayed")
def _(page: Page, billing):
    billingSection = page.get_by_role("region", name="Billing")

    expect(billingSection.get_by_label("Billing Address")).to_contain_text(
        billing.address_to_line
    )
    expect(billingSection.get_by_label("Billing Address")).to_contain_text(billing.city)
    expect(billingSection.get_by_label("Billing Address")).to_contain_text(
        billing.state
    )
    expect(billingSection.get_by_label("Billing Address")).to_contain_text(billing.zip)


@then("the balance is $0.00")
def _(page: Page):
    billingSection = page.get_by_role("region", name="Billing")
    expect(billingSection.get_by_label("Current Balance")).to_contain_text("$0.00")
