Feature: Workday Login

  Background:
    Given I am on the Workday login page

  Scenario: Successful login with valid credentials
    When I enter username "testuser@company.com" and password "Password123"
    And I click the Sign In button
    Then I should be redirected to the Workday home page

  Scenario: Login fails with invalid password
    When I enter username "testuser@company.com" and password "WrongPassword!"
    And I click the Sign In button
    Then I should see a login error message containing "incorrect"

  Scenario: Login fails with invalid username
    When I enter username "notexist@company.com" and password "Password123"
    And I click the Sign In button
    Then I should see a login error message containing "incorrect"

  Scenario: Login fails when credentials are empty
    When I click the Sign In button without entering credentials
    Then I should see field validation errors

  Scenario: Forgot password link is accessible
    When I click the "Forgot Password" link on the login page
    Then I should see the password reset page
