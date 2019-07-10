class TrackedItem < ApplicationRecord
    belongs_to :user
    has_many :price_queries
end
