Feature: Workday Manager Actions

  Background:
    Given I am logged into Workday as a manager

  Scenario: View team members
    When I navigate to My Team
    Then I should see team members listed

  Scenario: View team time off calendar
    When I navigate to the Team Time Off calendar
    Then I should see the team calendar

  Scenario: Search for an employee
    When I search for employee "John"
    Then I should see search results for employee "John"

  Scenario: Approve pending inbox items
    Given I am on the Inbox page
    When I approve all pending inbox actions
    Then the inbox should be empty after approvals
