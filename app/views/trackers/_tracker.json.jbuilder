json.extract! tracker, :id, :name, :url, :threshold, :created_at, :updated_at
json.url tracker_url(tracker, format: :json)
