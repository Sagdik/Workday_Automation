Feature: Workday Dashboard Navigation

  Background:
    Given I am logged into Workday

  Scenario: Dashboard displays core worklets
    Then I should see the "Time Off" worklet on the dashboard
    And I should see the "Pay" worklet on the dashboard
    And I should see the "Benefits" worklet on the dashboard

  Scenario: Navigate to Time Off from dashboard
    When I click on the "Time Off" worklet
    Then I should be on the Time Off page

  Scenario: Navigate to Pay from dashboard
    When I click on the "Pay" worklet
    Then I should be on the Pay page

  Scenario: Navigate to Benefits from dashboard
    When I click on the "Benefits" worklet
    Then I should be on the Benefits page

  Scenario: Use global search to find content
    When I search for "Time Off" using global search
    Then I should see search results for "Time Off"

  Scenario: Sign out from Workday
    When I sign out of Workday
    Then I should be on the Workday login page
