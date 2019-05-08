class Property < ApplicationRecord
    has_many :icals, dependent: :destroy
    has_many :reservations, dependent: :destroy

    belongs_to :owner, :class_name => "User", foreign_key: "owner_id"

    after_initialize :init
    validates_presence_of :owner

    def current_reservation
        reservations.where("\"end\" > ?", Date.today).where("start <= ?", Date.today).order(:end).last
    end

    def duration
        reservations.sum(:duration)
    end

    def init
        self.color ||= "dc583c"
    end
end
