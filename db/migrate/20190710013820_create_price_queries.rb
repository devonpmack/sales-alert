class CreatePriceQueries < ActiveRecord::Migration[6.0]
  def change
    create_table :price_queries do |t|
      t.float :price

      t.timestamps
    end
  end
end
