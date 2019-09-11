class ProxyUrl < ApplicationRecord
  def self.get_proxy
    @index ||= 0

    proxies = ProxyUrl.all

    if @index >= proxies.count
      @index = 0
    end

    proxy = proxies[@index]
    @index += 1

    URI.parse("http://#{proxy.ip}")
  end
end
