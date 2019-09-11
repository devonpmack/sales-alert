namespace :wink do
  desc "Query all tracked items"
  task query: :environment do
    User.all.each do |user|
      user.run_queries
    end
  end
end
