Feature: Workday Personal Information

  Background:
    Given I am logged into Workday
    And I am on the Personal Information page

  Scenario: View personal name information
    Then I should see my full name displayed

  Scenario: View contact information
    When I navigate to the "Contact Information" section
    Then I should see my work email
    And I should see my work phone number
    And I should see my home address

  Scenario: View emergency contact
    When I navigate to the "Emergency Contacts" section
    Then I should see my emergency contact information

  Scenario: View job details
    When I navigate to the "Job" section
    Then I should see my job title
    And I should see my department
    And I should see my manager
