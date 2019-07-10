class CreateTrackers < ActiveRecord::Migration[6.0]
  def change
    create_table :trackers do |t|
      t.string :name
      t.string :url
      t.float :threshold

      t.timestamps
    end
  end
end
