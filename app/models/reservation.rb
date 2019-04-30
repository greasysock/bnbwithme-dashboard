class Reservation < ApplicationRecord
    belongs_to :property
    belongs_to :cleaner, :class_name => 'User', foreign_key: 'cleaner_id'
end