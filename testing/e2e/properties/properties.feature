Feature: Managing properties
    As a user I want to be able to view and manage properties and their details.

    Scenario: List properties
        Given properties are populated in the database 
        When a user navigates to the properties screen
        Then the user should see a list of properties

    Scenario: View property details from list for a new property
        Given properties are populated in the database 
        When a user navigates to the properties screen
        And the user selects a property from the list
        Then the user should see the property details
        And the user should see the mailing addresses
        And the user should see the owners
        And the user should see options to setup billing

    Scenario: View property details for a property with billing setup
        Given a property with billing setup
        When a user navigates to the property's screen
        Then the user should see the property details
        And the user should see the mailing addresses
        And the user should see the owners
        And the user should see billing details
