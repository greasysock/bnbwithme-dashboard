class Property < ApplicationRecord
    has_many :icals
    has_many :reservations
    belongs_to :owner, :class_name => "User", foreign_key: "owner_id"

    after_initialize :init
    validates_presence_of :owner
    def init
        self.color ||= "dc583c"
    end
end
