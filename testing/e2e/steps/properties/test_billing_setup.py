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

import logging


@scenario("../../properties/billing_setup.feature", "Enter basic billing information")
def test_basic_billing_information():
    """Enter basic billing information"""
    pass


@scenario(
    "../../properties/billing_setup.feature", "Enter billing information with a balance"
)
def test_billing_information_with_balance():
    """Enter billing information with a balance"""
    pass


@scenario(
    "../../properties/billing_setup.feature",
    "Enter billing information selecting a bill to person",
)
def test_billing_information_selecting_a_bill_to_person():
    """Enter billing information selecting a bill to person"""
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

    return billing


@then("the billing information is saved")
def _(page: Page, billing):
    """the billing information should be saved"""
    page.get_by_role("button", name="Save").click()
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


@when("I enter a balance of 100")
def when_i_enter_a_blance_of_100(page: Page):
    page.get_by_role("textbox", name="Current Balance").fill("100")


@then("the balance is 100.00")
def then_the_balance_is_100(page: Page):
    billingSection = page.get_by_role("region", name="Billing")
    expect(billingSection.get_by_label("Current Balance")).to_contain_text("$100.00")


@when("I select a bill to person", target_fixture="billto")
def given_i_select_a_bill_to_person(page: Page, property):
    person = property.people.first()
    page.get_by_role("combobox", name="Bill To Owner").select_option(person.name)

    return person


@then("the bill to contact information is displayed")
def then_the_bill_to_contact_is_displayed(page: Page, billto):
    billingSection = page.get_by_role("region", name="Billing")
    address = billto.owner.addresses.first()
    expect(billingSection.get_by_label("Billing Address")).to_contain_text(billto.name)
    expect(billingSection.get_by_label("Billing Address")).to_contain_text(
        address.street_address
    )
    expect(billingSection.get_by_label("Billing Address")).to_contain_text(address.city)
    expect(billingSection.get_by_label("Billing Address")).to_contain_text(
        address.state
    )
    expect(billingSection.get_by_label("Billing Address")).to_contain_text(address.zip)
