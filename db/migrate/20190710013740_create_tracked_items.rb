class CreateTrackedItems < ActiveRecord::Migration[6.0]
  def change
    create_table :tracked_items do |t|
      t.string :name
      t.string :url
      t.float :threshold

      t.timestamps
    end
  end
end
