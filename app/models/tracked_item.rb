class TrackedItem < ApplicationRecord
    belongs_to :user
    has_many :price_queries

    def check_threshold(price)
        if price < threshold
            logger.info("EMAIL TO " + user.email)
        end
    end

    def unique?
        unless user
            user = current_user
        end
        current_user.tracked_items.where(url: @tracked_item.url).count < 1
    end
end
