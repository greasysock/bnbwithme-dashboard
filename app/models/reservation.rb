class Reservation < ApplicationRecord
    belongs_to :property
    belongs_to :ical
    belongs_to :cleaner, :class_name => 'User', foreign_key: 'cleaner_id'

    def service
        self.ical.service
    end

    validates_presence_of :start, :end, :duration

end
