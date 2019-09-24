namespace :wink do
  desc "Query all tracked items"
  task query: :environment do
    User.all.each do |user|
      user.tracked_items.each do |item|
        RunQueriesJob.perform_now(item)
      end
    end
  end
end
