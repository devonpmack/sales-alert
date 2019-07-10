class AddReferences < ActiveRecord::Migration[6.0]
  def change
    add_belongs_to(:tracked_items, :user)
    add_belongs_to(:price_queries, :tracked_item)
  end
end
