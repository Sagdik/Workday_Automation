Feature: Workday Benefits

  Background:
    Given I am logged into Workday
    And I am on the Benefits page

  Scenario: View benefit sections
    Then I should see at least one benefit section

  Scenario: View medical insurance plan
    Then I should see my Medical plan details

  Scenario: View dental and vision plans
    Then I should see my Dental plan details
    And I should see my Vision plan details

  Scenario: View retirement contribution
    Then I should see my retirement contribution
