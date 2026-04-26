Feature: Workday Recruiting and Job Search

  Background:
    Given I am logged into Workday
    And I am on the Recruiting page

  Scenario: Browse available job listings
    Then I should see job listings

  Scenario: Search for a specific job
    When I search for job "Software Engineer"
    Then I should see job listings

  Scenario: View job posting details
    When I open the first job posting
    Then I should see the job title
    And I should see the job location

  Scenario: Filter jobs by department
    When I filter jobs by department "Engineering"
    Then I should see job listings
