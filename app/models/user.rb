class User < ApplicationRecord
    has_many :tracked_items
    has_secure_password
    validates :email, presence: true
    validates :email, uniqueness: { case_sensitive: false}

    def run_queries
      RunQueriesJob.perform_now(self)
    end
end
