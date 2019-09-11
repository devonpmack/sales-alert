require "open-uri"
require 'nokogiri'

class RunQueriesJob < ApplicationJob
  queue_as :default

  def perform(user)
    # Do something later
    user.tracked_items.each do |item|
      logger.info item.url

      price_dollars = item.query

      if price_dollars
        logger.info price_dollars
        PriceQuery.create!(tracked_item_id: item.id, price: price_dollars);
      end
    end
  end
end
