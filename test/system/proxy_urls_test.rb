require "application_system_test_case"

class ProxyUrlsTest < ApplicationSystemTestCase
  setup do
    @proxy_url = proxy_urls(:one)
  end

  test "visiting the index" do
    visit proxy_urls_url
    assert_selector "h1", text: "Proxy Urls"
  end

  test "creating a Proxy url" do
    visit proxy_urls_url
    click_on "New Proxy Url"

    fill_in "Ip", with: @proxy_url.ip
    click_on "Create Proxy url"

    assert_text "Proxy url was successfully created"
    click_on "Back"
  end

  test "updating a Proxy url" do
    visit proxy_urls_url
    click_on "Edit", match: :first

    fill_in "Ip", with: @proxy_url.ip
    click_on "Update Proxy url"

    assert_text "Proxy url was successfully updated"
    click_on "Back"
  end

  test "destroying a Proxy url" do
    visit proxy_urls_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Proxy url was successfully destroyed"
  end
end
