class CreateProxyUrls < ActiveRecord::Migration[6.0]
  def change
    create_table :proxy_urls do |t|
      t.string :ip

      t.timestamps
    end
  end
end
