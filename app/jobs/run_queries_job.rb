require "open-uri"
require 'nokogiri'

class RunQueriesJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
    TrackedItem.all.each do |item|
      logger.info item.url
      doc = Nokogiri::HTML(open(item.url, {"User-Agent"=> 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'}))

      price_block = doc.at_css("span#priceblock_ourprice")
      unless price_block
        price_block = doc.at_css("span#priceblock_dealprice")
      end

      price_dollars = price_block.children.first.text.sub("CDN", "CAD").to_money.dollars.to_f

      logger.info price_dollars
      break
      # PriceQuery.create!(tracked_item_id: item.id, price: 20);
    end
  end
end
