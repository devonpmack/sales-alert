require "application_system_test_case"

class PriceQueriesTest < ApplicationSystemTestCase
  setup do
    @price_query = price_queries(:one)
  end

  test "visiting the index" do
    visit price_queries_url
    assert_selector "h1", text: "Price Queries"
  end

  test "creating a Price query" do
    visit price_queries_url
    click_on "New Price Query"

    fill_in "Price", with: @price_query.price
    click_on "Create Price query"

    assert_text "Price query was successfully created"
    click_on "Back"
  end

  test "updating a Price query" do
    visit price_queries_url
    click_on "Edit", match: :first

    fill_in "Price", with: @price_query.price
    click_on "Update Price query"

    assert_text "Price query was successfully updated"
    click_on "Back"
  end

  test "destroying a Price query" do
    visit price_queries_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Price query was successfully destroyed"
  end
end
