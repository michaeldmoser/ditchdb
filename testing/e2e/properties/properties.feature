Feature: Listing properties in the database
  As a user I want to be able to view a list the properties in the system's database.

  Scenario: List properties
    Given properties are populated in the database 
    When a user navigates to the properties screen
    Then the user should see a list of properties
