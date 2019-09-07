require "open-uri"
require 'nokogiri'

class RunQueriesJob < ApplicationJob
  queue_as :default

  def perform(user)
    # Do something later
    user.tracked_items.each do |item|
      logger.info item.url
      response = open(item.url, {"User-Agent"=> 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'})
      unless response
        next
      end
      doc = Nokogiri::HTML(response)

      price_block = doc.at_css("span#priceblock_ourprice")
      unless price_block
        price_block = doc.at_css("span#priceblock_dealprice")
      end

      begin
        price_dollars = price_block.children.first.text.sub("CDN", "CAD").to_money.dollars.to_f
      rescue Monetize::ParseError
        logger.error "Couldn't parse " + price_block.children.first.text + "!"
      end

      logger.info price_dollars

        PriceQuery.create!(tracked_item_id: item.id, price: price_dollars);

    end
  end
end
