Feature: Vite + React
  Scenario: visiting the frontpage
    When I visit the frontpage
    Then I should see Vite + React

    Scenario: clicking the button
      When I click the button
      Then the count should be 1
