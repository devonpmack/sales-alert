json.extract! tracked_item, :id, :name, :url, :threshold, :created_at, :updated_at
json.url tracked_item_url(tracked_item, format: :json)
