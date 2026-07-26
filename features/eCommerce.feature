Feature: Ecommerce Validations
@Regression
  Scenario: Placing Order
    Given a login to ecommerce application with "anshika@gmail.com" and "Iamking@000"
    When Add "Zara Coat 3" to Cart
    Then verify Cart
    And Enter user details and Place Order
    Then Verify Order in OrderHistory page