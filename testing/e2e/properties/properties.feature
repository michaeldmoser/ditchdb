Feature: Listing properties in the database
    As a user I want to be able to view a list the properties in the system's database.

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
