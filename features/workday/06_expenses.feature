Feature: Workday Expense Management

  Background:
    Given I am logged into Workday
    And I am on the Expenses page

  Scenario: View existing expense reports
    Then I should see at least one expense report

  Scenario: Create a new expense report
    When I click Create Expense Report
    And I enter the report title "Q4 Business Travel"
    And I add an expense line item
    And I select expense type "Hotel"
    And I enter the amount "150.00"
    And I enter expense date "10/15/2025"
    And I enter the memo "Hotel stay for client meeting"
    And I submit the expense report
    Then I should see the expense report status as "Submitted"

  Scenario: Create a meal expense report
    When I click Create Expense Report
    And I enter the report title "Team Lunch October"
    And I add an expense line item
    And I select expense type "Meals"
    And I enter the amount "45.00"
    And I enter expense date "10/20/2025"
    And I enter the memo "Team lunch with client"
    And I submit the expense report
    Then I should see the expense report status as "Submitted"

  Scenario: Create a transportation expense
    When I click Create Expense Report
    And I enter the report title "Airport Transportation"
    And I add an expense line item
    And I select expense type "Transportation"
    And I enter the amount "75.00"
    And I enter expense date "10/22/2025"
    And I enter the memo "Taxi to airport"
    And I submit the expense report
    Then I should see the expense report status as "Submitted"
