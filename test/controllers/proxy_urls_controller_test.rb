require 'test_helper'

class ProxyUrlsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @proxy_url = proxy_urls(:one)
  end

  test "should get index" do
    get proxy_urls_url
    assert_response :success
  end

  test "should get new" do
    get new_proxy_url_url
    assert_response :success
  end

  test "should create proxy_url" do
    assert_difference('ProxyUrl.count') do
      post proxy_urls_url, params: { proxy_url: { ip: @proxy_url.ip } }
    end

    assert_redirected_to proxy_url_url(ProxyUrl.last)
  end

  test "should show proxy_url" do
    get proxy_url_url(@proxy_url)
    assert_response :success
  end

  test "should get edit" do
    get edit_proxy_url_url(@proxy_url)
    assert_response :success
  end

  test "should update proxy_url" do
    patch proxy_url_url(@proxy_url), params: { proxy_url: { ip: @proxy_url.ip } }
    assert_redirected_to proxy_url_url(@proxy_url)
  end

  test "should destroy proxy_url" do
    assert_difference('ProxyUrl.count', -1) do
      delete proxy_url_url(@proxy_url)
    end

    assert_redirected_to proxy_urls_url
  end
end
