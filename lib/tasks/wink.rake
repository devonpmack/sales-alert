namespace :wink do
  desc "Query all tracked items"
  task query: :environment do
    User.all.each do |user|
      RunQueriesJob.perform_now(user)
    end
  end

end
