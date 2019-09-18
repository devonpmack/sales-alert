require "open-uri"
require 'nokogiri'

class RunQueriesJob < ApplicationJob
  queue_as :default

  def perform(item)
    logger.info item.url

    price_dollars = item.query

    if price_dollars
      logger.info price_dollars

      last_query = item.latest_query

      if last_query && last_query.price == price_dollars
        last_query.touch
      else
        PriceQuery.create!(tracked_item_id: item.id, price: price_dollars)
      end

      if price_dollars < item.threshold
        logger.info "Price below threshold! Sending email to #{item.user.email}"
        NotificationMailer.with(tracked_item: item).price_notification_email.deliver_now
      else
        logger.info "Price is not below threshold."
      end

      logger.info("Success")
    else
      logger.info("Could not find price")
    end
  end
end
