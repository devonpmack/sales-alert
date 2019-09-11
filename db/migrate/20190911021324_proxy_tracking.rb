class ProxyTracking < ActiveRecord::Migration[6.0]
  def change
    add_column :proxy_urls, :num_success, :integer, default: 0
    add_column :proxy_urls, :num_failures, :integer, default: 0
    ProxyUrl.all do |url|
      url.num_success = 0
      url.num_failures = 0
      url.save!
    end
  end
end
