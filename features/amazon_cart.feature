Feature: Amazon Shopping Cart

  Scenario: Add 55 inch LG TV to cart
    Given I open Amazon
    When I search for "55 inch LG TV"
    And I open the first search result
    And I add the product to the cart
    Then I should see the item in the cart
