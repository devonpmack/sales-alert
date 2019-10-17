class TrackedItem < ApplicationRecord
    belongs_to :user
    has_many :price_queries

    # order of priority
    POSSIBLE_IDS = [
      "span#priceblock_saleprice",
      "span#priceblock_dealprice",
      "span#priceblock_ourprice"
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
      response = scrape(url)
      unless response
        return
      end
      doc = Nokogiri::HTML(response&.open&.read)

      unless doc
        return
      end
      price_block = nil
      POSSIBLE_IDS.each do |id|
        price_block = doc.at_css(id)
        break if price_block
      end

      unless price_block
        logger.error("Failed to get #{url}. Response saved #{response}")
        if Rails.env.development?
          IO.write("#{Rails.root}/test.html", response.open.read);
        end
        response.close
        return nil
      end

      begin
        price_dollars = price_block.children.first.text.sub("CDN", "CAD").to_money.dollars.to_f
      rescue Monetize::ParseError
        logger.error "Couldn't parse " + price_block.children.first.text + "!"
      end

      unless price_dollars
        logger.error "Failed to find price of #{url}"
        # IO.write("#{Rails.root}/test.html", response.open.read);
        response.close
      end

      price_dollars
    end

    def latest_query
      price_queries.last
    end

    private

    def scrape(product_url)
      resp = nil
      attempts = 0
      until resp or attempts >= 8
        logger.info("Attempting to query #{product_url}")
        attempts += 1
        proxy = ProxyUrl.get_proxy
        fail = false
        begin
          resp = open(product_url, open_timeout: 15, proxy: proxy.uri, 'User-Agent' => 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36')
        rescue Timeout::Error, EOFError, Errno::ECONNRESET, OpenURI::HTTPError, Net::HTTPFatalError, Exception => ex
          logger.debug "An error of type #{ex.class} happened, message is #{ex.message}"
          fail = true
        end

        if fail or !resp
          proxy.increment!(:num_failures)
        else
          proxy.increment!(:num_success)
        end
      end

      if resp
        doc = Nokogiri::HTML(resp)
        if doc
          lightning_deal_link = doc.at('a:contains("View Offer")')
          if lightning_deal_link && lightning_deal_link["href"]
            return scrape("https://amazon.ca#{lightning_deal_link["href"]}")
          end
        end
      end

      resp
    end
end
