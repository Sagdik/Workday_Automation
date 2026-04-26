Feature: Workday Inbox and Action Items

  Background:
    Given I am logged into Workday
    And I am on the Inbox page

  Scenario: View inbox items
    Then I should see inbox items in my inbox

  Scenario: Approve an inbox action item
    When I approve the first inbox item
    Then I should see a success notification

  Scenario: Open an inbox item
    When I open the first inbox item
    Then I should see the password reset page
