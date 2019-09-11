class ProxyUrl < ApplicationRecord
  def self.get_proxy
    @index ||= 0

    proxies = ProxyUrl.all

    if @index >= proxies.count
      @index = 0
    end

    proxy = proxies[@index]
    @index += 1

    proxy
  end

  def uri
    URI.parse("http://#{ip}")
  end
end
