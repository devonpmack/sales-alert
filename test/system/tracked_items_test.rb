require "application_system_test_case"

class TrackedItemsTest < ApplicationSystemTestCase
  setup do
    @tracked_item = tracked_items(:one)
  end

  test "visiting the index" do
    visit tracked_items_url
    assert_selector "h1", text: "Tracked Items"
  end

  test "creating a Tracked item" do
    visit tracked_items_url
    click_on "New Tracked Item"

    fill_in "Name", with: @tracked_item.name
    fill_in "Threshold", with: @tracked_item.threshold
    fill_in "Url", with: @tracked_item.url
    click_on "Create Tracked item"

    assert_text "Tracked item was successfully created"
    click_on "Back"
  end

  test "updating a Tracked item" do
    visit tracked_items_url
    click_on "Edit", match: :first

    fill_in "Name", with: @tracked_item.name
    fill_in "Threshold", with: @tracked_item.threshold
    fill_in "Url", with: @tracked_item.url
    click_on "Update Tracked item"

    assert_text "Tracked item was successfully updated"
    click_on "Back"
  end

  test "destroying a Tracked item" do
    visit tracked_items_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Tracked item was successfully destroyed"
  end
end
