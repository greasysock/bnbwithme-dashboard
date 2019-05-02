class Property < ApplicationRecord
    has_many :icals
    has_many :reservations
    after_initialize :init

    validates_presence_of :owner
    def init
        self.color ||= "dc583c"
    end
end
