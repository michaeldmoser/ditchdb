Feature: Billing setup on a property
    As a user I want to be able to setup billing on a property so that the ditch company can bill the property owner for assessments.

    Scenario: Enter basic billing information
        Given a property without billing information
        When I enter the billing information
        Then the billing information is saved
        And the billing information should be displayed
        And the balance is $0.00

    Scenario: Enter billing information with a balance
        Given a property without billing information
        When I enter the billing information
        And I enter a balance of 100
        Then the billing information is saved
        And the billing information should be displayed
        And the balance is 100.00

    Scenario: Enter billing information selecting a bill to person
        Given a property without billing information
        When I enter the billing information
        And I select a bill to person
        Then the billing information is saved
        And the bill to contact information is displayed

    Scenario: Enter billing information selecting a bill to organization
        Given a property without billing information
        When I enter the billing information
        And I select a bill to organization
        Then the billing information is saved
        And the billing information should be displayed
        And the bill to organization is displayed


