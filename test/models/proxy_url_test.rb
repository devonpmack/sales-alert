require 'test_helper'

class ProxyUrlTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "can get all proxies" do
    assert_equal ProxyUrl.get_proxy, URI.parse("http://#{proxy_urls(:one).ip}")
    assert_equal ProxyUrl.get_proxy, URI.parse("http://#{proxy_urls(:two).ip}")
    assert_equal ProxyUrl.get_proxy, URI.parse("http://#{proxy_urls(:three).ip}")
    assert_equal ProxyUrl.get_proxy, URI.parse("http://#{proxy_urls(:one).ip}")
    assert_equal ProxyUrl.get_proxy, URI.parse("http://#{proxy_urls(:two).ip}")
    assert_equal ProxyUrl.get_proxy, URI.parse("http://#{proxy_urls(:three).ip}")
    assert_equal ProxyUrl.get_proxy, URI.parse("http://#{proxy_urls(:one).ip}")
  end
end
