class RemoveTimestamps < ActiveRecord::Migration[6.0]
  def change
    remove_column :proxy_urls, :created_at
    remove_column :proxy_urls, :updated_at
  end
end
