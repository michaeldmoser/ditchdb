Feature: List the properties
  As a user I want to be able to view a list the properties in the system's database.

  Scenario: List properties
    Given the following properties are in the database
    When I list properties
    Then I should see the following properties
    # And each property should display the following details