class Reservation < ApplicationRecord
    belongs_to :property
    belongs_to :ical
    belongs_to :cleaner, :class_name => 'User', foreign_key: 'cleaner_id'

    validates_presence_of :start, :end, :duration
end
