Feature: List the properties
  As a user I want to be able to view a list of and search the properties in the system's database.

  Scenario: List properties
    Given I have the following properties:
      | address  |
      | 310 S Curtis St  |
      | 2530 S 3rd St W  |
    When I list properties
    Then I should see the following properties:
      | address  |
      | 310 S Curtis St  |
      | 2530 S 3rd St W  |
    And each property should display the following details:
      | fields |
      | address |
      | acres |
