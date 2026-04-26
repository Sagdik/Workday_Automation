Feature: Workday Payroll and Pay Slips

  Background:
    Given I am logged into Workday
    And I am on the Pay page

  Scenario: View list of payslips
    Then I should see at least one payslip

  Scenario: View latest payslip details
    When I click on the latest payslip
    Then I should see the net pay amount
    And I should see the gross pay amount
    And I should see the pay period

  Scenario: View tax withholding on payslip
    When I click on the latest payslip
    Then I should see the tax withheld amount

  Scenario: Access tax documents
    When I navigate to Tax Documents
    Then I should see tax documents listed
