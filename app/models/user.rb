class User < ApplicationRecord
    has_many :tracked_items
    has_secure_password
end
