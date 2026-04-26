Feature: Workday Time Off Management

  Background:
    Given I am logged into Workday
    And I am on the Time Off page

  Scenario: View time off balance
    Then I should see my "Vacation" balance

  Scenario: Submit a vacation time off request
    When I click Request Time Off
    And I select time off type "Vacation"
    And I enter start date "12/01/2025"
    And I enter end date "12/05/2025"
    And I enter the comment "Annual vacation leave"
    And I submit the time off request
    Then I should see the time off request submitted successfully

  Scenario: Submit a sick leave request
    When I click Request Time Off
    And I select time off type "Sick"
    And I enter start date "11/15/2025"
    And I enter end date "11/15/2025"
    And I enter the comment "Feeling unwell"
    And I submit the time off request
    Then I should see the time off request submitted successfully

  Scenario: Cancel the time off request form without submitting
    When I click Request Time Off
    And I select time off type "Vacation"
    And I enter start date "12/20/2025"
    And I cancel the time off request form
    Then I should be back on the Time Off page

  Scenario: View existing time off requests
    Then I should see 0 time off request(s) in the list
