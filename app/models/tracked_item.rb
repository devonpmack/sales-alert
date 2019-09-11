class TrackedItem < ApplicationRecord
    belongs_to :user
    has_many :price_queries

    POSSIBLE_IDS = [
      "span#priceblock_ourprice",
      "span#priceblock_saleprice",
      "span#priceblock_dealprice"
    ]

    AVAILABLE_PROXIES = [
      '173.46.67.172:58517',
      '24.172.82.94:53281',
      '35.192.7.115:8080',
      '35.247.189.6:8080',
      '68.251.250.193:8080',
      '76.87.101.188:38875'
    ]

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

    def query
      response = open(url, proxy: URI.parse(PROXY),'User-Agent' => 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36')
      unless response
        return
      end
      doc = Nokogiri::HTML(response)

      price_block = nil
      POSSIBLE_IDS.each do |id|
        price_block = doc.at_css(id)
        return if price_block
      end

      unless price_block
        logger.error("Failed to get #{url}. Response saved #{response}")
        IO.write("#{Rails.root}/test.html", response.open.read);
        response.close
        return nil
      end

      begin
        price_dollars = price_block.children.first.text.sub("CDN", "CAD").to_money.dollars.to_f
      rescue Monetize::ParseError
        logger.error "Couldn't parse " + price_block.children.first.text + "!"
      end

      price_dollars
    end
end
