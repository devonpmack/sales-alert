require 'test_helper'

class ProxyUrlTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "can get all proxies" do
    assert_equal ProxyUrl.get_proxy, proxy_urls(:one)
    assert_equal ProxyUrl.get_proxy, proxy_urls(:two)
    assert_equal ProxyUrl.get_proxy, proxy_urls(:three)
    assert_equal ProxyUrl.get_proxy, proxy_urls(:one)
    assert_equal ProxyUrl.get_proxy, proxy_urls(:two)
    assert_equal ProxyUrl.get_proxy, proxy_urls(:three)
    assert_equal ProxyUrl.get_proxy, proxy_urls(:one)
  end
end
