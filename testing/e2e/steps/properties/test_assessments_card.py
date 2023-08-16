"""Assessments card"""

from pytest_bdd import (given, when, then, scenario)

from playwright.sync_api import (Page, expect)

@scenario('../../properties/assessments-card.feature', 'Has no assessment information')
def test_no_assessment_information():
    """Test assessments card"""

@scenario('../../properties/assessments-card.feature', 'Has assessment information')
def test_has_assessments_setup():
    """Test assessments card"""

@given('a property with no assessment information')
def _():
    """Create a property that has not had assessments/billing setup yet"""
    raise NotImplementedError

@when('a user navigates to that property\'s detail screen')
def _(page: Page):
    """a user navigates to the property's detail screen"""
    raise NotImplementedError

@then('the user should see an assessments card with a start billing button')
def _(page: Page):
   """the user should see an assessments card with a start billing button""" 
   raise NotImplementedError

@given('a property with assessment billing setup')
def _():
	"""a property with assessment billing setup"""
	raise NotImplementedError

@when('a user navigates to that property\'s detail screen')
def _():
	"""a user navigates to that property's detail screen"""
	raise NotImplementedError

@then('the user should see the assessments summary')
def _():
	"""the user should see the assessments summary"""
	raise NotImplementedError



    
