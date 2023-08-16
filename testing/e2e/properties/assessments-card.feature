Feature: Assessments card
  As a user I want to see billing and assessment details for a property

  Scenario: Has no assessment information
    Given a property with no assessment information
    When a user navigates to that property's detail screen
    Then the user should see an assessments card with a start billing button

    Scenario: Has assessment information
        Given a property with assessment billing setup
        When a user navigates to that property's detail screen
        Then the user should see the assessments summary 
        And should see the billing address
        And should see the current balance
